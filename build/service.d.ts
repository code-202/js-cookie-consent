export interface ServiceDefinition {
    id: string;
    needConsent: boolean;
    type?: string;
    name?: string;
    cookies?: string[];
}
export interface ServiceOptions extends ServiceDefinition {
    onAccept?: () => void;
    onDecline?: () => void;
}
export interface ServiceInformations extends ServiceDefinition {
    consent: ConsentResponse;
}
export type ConsentResponse = 'yes' | 'no' | 'unknown';
export declare class Service implements ServiceInformations {
    consent: ConsentResponse;
    protected _options: ServiceOptions;
    constructor(options: ServiceOptions);
    get id(): string;
    get needConsent(): boolean;
    get type(): string;
    get name(): string;
    get cookies(): string[];
    get definition(): ServiceDefinition;
    accept(): void;
    decline(): void;
}
