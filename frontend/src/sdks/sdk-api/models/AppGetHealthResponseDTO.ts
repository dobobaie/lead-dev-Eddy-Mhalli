/* tslint:disable */
/* eslint-disable */
/**
 * Swagger API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AppGetHealthResponseDTO
 */
export interface AppGetHealthResponseDTO {
    /**
     * 
     * @type {string}
     * @memberof AppGetHealthResponseDTO
     */
    status: string;
}

/**
 * Check if a given object implements the AppGetHealthResponseDTO interface.
 */
export function instanceOfAppGetHealthResponseDTO(value: object): value is AppGetHealthResponseDTO {
    if (!('status' in value) || value['status'] === undefined) return false;
    return true;
}

export function AppGetHealthResponseDTOFromJSON(json: any): AppGetHealthResponseDTO {
    return AppGetHealthResponseDTOFromJSONTyped(json, false);
}

export function AppGetHealthResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppGetHealthResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
    };
}

  export function AppGetHealthResponseDTOToJSON(json: any): AppGetHealthResponseDTO {
      return AppGetHealthResponseDTOToJSONTyped(json, false);
  }

  export function AppGetHealthResponseDTOToJSONTyped(value?: AppGetHealthResponseDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'status': value['status'],
    };
}

