
export class BusinessResultModel<T> {
    public Date: Date;
    public Message: string;
    public SuccessfulOperation: boolean;
    public Result: T;
}
