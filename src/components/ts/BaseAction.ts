export default abstract class BaseAction {
    public abstract action(form: any): Promise<any>;
}