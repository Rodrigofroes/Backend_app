// contrato de uso de caso de uso, por de entrada de controller para caso de uso
export interface Usecase<InputDto, OutputDto> {
    execute(input: InputDto): Promise<OutputDto>;
}