export default abstract class BaseMethod {
    public abstract action(form: any): Promise<any>;
}