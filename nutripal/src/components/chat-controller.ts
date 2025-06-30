import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import { getAPIResponse } from '../core/http/index.js';
import { parseStreamedMessages } from '../core/parser/index.js';
import { type ChatResponseError, getTimestamp, processText } from '../utils/index.js';
import { globalConfig } from '../config/global-config.js';

export class ChatController implements ReactiveController {
  host: ReactiveControllerHost;
  private _generatingAnswer: boolean = false;
  private _isAwaitingResponse: boolean = false;
  private _isProcessingResponse: boolean = false;
  private _processingMessage: ChatThreadEntry | undefined = undefined;
  private _abortController: AbortController = new AbortController();

  get isAwaitingResponse() {
    return this._isAwaitingResponse;
  }

  get isProcessingResponse() {
    return this._isProcessingResponse;
  }

  get processingMessage() {
    return this._processingMessage;
  }

  get generatingAnswer() {
    return this._generatingAnswer;
  }

  set generatingAnswer(value: boolean) {
    this._generatingAnswer = value;
    this.host.requestUpdate();
  }

  set processingMessage(value: ChatThreadEntry | undefined) {
    this._processingMessage = value
      ? {
          ...value,
        }
      : undefined;
    this.host.requestUpdate();
  }

  set isAwaitingResponse(value: boolean) {
    this._isAwaitingResponse = value;
    this.host.requestUpdate();
  }

  set isProcessingResponse(value: boolean) {
    this._isProcessingResponse = value;
    this.host.requestUpdate();
  }

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    // no-op
  }

  hostDisconnected() {
    // no-op
  }

  private clear() {
    this._isAwaitingResponse = false;
    this._isProcessingResponse = false;
    this._generatingAnswer = false;
    this.host.requestUpdate(); // do update once
  }

  reset() {
    this._processingMessage = undefined;
    this.clear();
  }

  async processResponse(response: string | BotResponse, isUserMessage: boolean = false, useStream: boolean = false) {
    const citations: Citation[] = [];
    const followingSteps: string[] = [];
    const followupQuestions: string[] = [];
    const timestamp = getTimestamp();
    let thoughts: string | undefined;
    let dataPoints: string[] | undefined;

    const updateChatWithMessageOrChunk = async (message: string | BotResponse, chunked: boolean) => {
      this.processingMessage = {
        id: crypto.randomUUID(),
        text: [
          {
            value: chunked ? '' : (message as string),
            followingSteps,
          },
        ],
        followupQuestions,
        citations: [...new Set(citations)],
        timestamp: timestamp,
        isUserMessage,
        thoughts,
        dataPoints,
      };

      if (chunked && this.processingMessage) {
        this.isProcessingResponse = true;
        this._abortController = new AbortController();

        await parseStreamedMessages({
          chatEntry: this.processingMessage,
          signal: this._abortController.signal,
          apiResponseBody: (message as unknown as Response).body,
          onChunkRead: (updated) => {
            this.processingMessage = updated;
          },
          onCancel: () => {
            this.clear();
          },
        });

        // processing done.
        this.clear();
      }
    };

    // Check if message is a bot message to process citations and follow-up questions

    if (isUserMessage || typeof response === 'string') {
      await updateChatWithMessageOrChunk(response, false);
    } else if (useStream) {
      await updateChatWithMessageOrChunk(response, true);
    } else {
      // non-streamed response
      const choice = (response as BotResponse).choices[0];
      const content = choice?.message?.content || choice?.text || '';
      const processedText = processText(content, [citations, followingSteps, followupQuestions]);
      const messageToUpdate = processedText.replacedText;
      // Push all lists coming from processText to the corresponding arrays
      citations.push(...(processedText.arrays[0] as unknown as Citation[]));
      followingSteps.push(...(processedText.arrays[1] as string[]));
      followupQuestions.push(...(processedText.arrays[2] as string[]));
      thoughts = choice?.message?.context?.thoughts ?? '';
      dataPoints = choice?.message?.context?.data_points ?? [];

      await updateChatWithMessageOrChunk(messageToUpdate, false);
    }
  }

  async generateAnswer(requestOptions: ChatRequestOptions, httpOptions: ChatHttpOptions) {
    const { question } = requestOptions;

    if (question) {
      try {
        this.generatingAnswer = true;

        // for chat messages, process user question as a chat entry
        if (requestOptions.type === 'chat') {
          await this.processResponse(question, true, false);
        }

        this.isAwaitingResponse = true;
        this.processingMessage = undefined;

        // Disable streaming for now to simplify the response handling
        const responseOptions = { ...httpOptions, stream: false };
        
        const response = (await getAPIResponse(requestOptions, responseOptions)) as BotResponse;
        this.isAwaitingResponse = false;

        // Process the response without streaming
        await this.processResponse(response, false, false);
      } catch (error_: any) {
        console.error('Error in generateAnswer:', error_);
        const error = error_ as ChatResponseError;
        
        // Extract error message from different possible locations
        let errorMessage = 'An unexpected error occurred. Please try again.';
        
        if (error?.message) {
          errorMessage = error.message;
        } else if (error_?.response?.data?.error?.message) {
          errorMessage = error_.response.data.error.message;
        } else if (typeof error_ === 'string') {
          errorMessage = error_;
        }
        
        const chatError = {
          message: errorMessage,
          code: error?.code || 'UNKNOWN_ERROR',
          details: error?.details || {}
        };

        console.error('Chat error:', chatError);

        if (!this.processingMessage) {
          // Add an empty message to the chat thread to display the error
          await this.processResponse('', false, false);
        }

        if (this.processingMessage) {
          this.processingMessage = {
            ...this.processingMessage,
            error: chatError,
          };
        }
      } finally {
        this.clear();
      }
    }
  }

  cancelRequest() {
    this._abortController.abort();
  }
}
