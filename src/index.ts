import * as Alexa from 'ask-sdk';
import { Response, RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { ResponseFactory } from 'ask-sdk-core';

export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<void> {

    const errorHandler = {
        canHandle() {
            return true;
        },
        handle(handlerInput, error) {
            console.log(`Error handled: ${error.message}`);
            const message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';

            return handlerInput.responseBuilder
                .speak(message)
                .reprompt(message)
                .getResponse();
        }
    };

    const launchRequestHandler = {
        canHandle(handlerInput: Alexa.HandlerInput): boolean {
            return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        },
        handle(): Response {
            const url = 'https://s3-us-west-2.amazonaws.com/cheese-machine/cheese-machine-intro.mp3';
            return ResponseFactory.init()
                .addAudioPlayerPlayDirective('REPLACE_ALL', url, url, 0, null, null)
                .withShouldEndSession(true)
                .getResponse();
        }
    };

    const priceIntentHandler = {
        canHandle(handlerInput: Alexa.HandlerInput): boolean {
            return handlerInput.requestEnvelope.request.type === 'IntentRequest'
                && handlerInput.requestEnvelope.request.intent.name == 'PriceIntent';
        },
        handle(): Response {
            const url = 'https://s3-us-west-2.amazonaws.com/cheese-machine/price.mp3';
            return ResponseFactory.init()
                .addAudioPlayerPlayDirective('REPLACE_ALL', url, url, 0, null, null)
                .withShouldEndSession(true)
                .getResponse();
        }
    };

    const skill: Alexa.Skill = Alexa.SkillBuilders.standard()
        .addRequestHandlers(
            launchRequestHandler,
            priceIntentHandler
        )
        .addErrorHandlers(errorHandler)
        .create();

    try {

        console.log('\n' + '******************* REQUEST  **********************');
        console.log(JSON.stringify(event, null, 2));

        const responseEnvelope: ResponseEnvelope = await skill.invoke(event, context);

        console.log('\n' + '******************* RESPONSE  **********************');
        console.log(JSON.stringify(responseEnvelope, null, 2));

        return callback(null, responseEnvelope);

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        return callback(error);
    }

};
