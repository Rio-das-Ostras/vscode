/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from 'vs/base/common/uri';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const ILanguageDetectionService = createDecorator<ILanguageDetectionService>('ILanguageDetectionService');

export interface ILanguageDetectionService {
	readonly _serviceBrand: undefined;

	/**
	 * @param modeId The modeId to check if language detection is currently enabled.
	 * @returns whether or not language detection is on for this language mode.
	 */
	isEnabledForMode(modeId: string): boolean;

	/**
	 * @param resource The resource to detect the language for.
	 * @returns the language mode for the given resource or undefined if the model is not confident enough.
	 */
	detectLanguage(resource: URI): Promise<string | undefined>;

	/**
	 * @param resource The resource to detect the language for.
	 * @returns all possible language modes detected in this resource.
	 */
	detectLanguages(resource: URI): Promise<string[]>;
}

//#region Telemetry events

export const AutomaticLanguageDetectionLikelyWrongId = 'automaticlanguagedetection.likelywrong';

export interface IAutomaticLanguageDetectionLikelyWrongData {
	choseOtherGuessedLanguage: boolean;
	currentLanguageId: string;
	nextLanguageId: string;
}

export type AutomaticLanguageDetectionLikelyWrongClassification = {
	choseOtherGuessedLanguage: { classification: 'SystemMetaData', purpose: 'FeatureInsight' },
	currentLanguageId: { classification: 'SystemMetaData', purpose: 'FeatureInsight' },
	nextLanguageId: { classification: 'SystemMetaData', purpose: 'FeatureInsight' }
};

export const LanguageDetectionStatsId = 'automaticlanguagedetection.stats';

export interface ILanguageDetectionStats {
	languages: string;
	confidences: string;
	timeSpent: number;
}

export type LanguageDetectionStatsClassification = {
	languages: { classification: 'SystemMetaData', purpose: 'FeatureInsight' };
	confidences: { classification: 'SystemMetaData', purpose: 'FeatureInsight' };
	timeSpent: { classification: 'SystemMetaData', purpose: 'FeatureInsight' };
};

//#endregion
