export class Option<T, E> {
    hasValue: boolean;
    value: T | undefined;
    error: E | undefined;

    Value(): T | undefined {
        return this.value;
    }

    Error(): E | undefined {
        return this.error;
    }

    Some(value: T): Option<T, E> {
        this.value = value;
        this.hasValue = true;
        return this;
    }

    None(error: E): Option<T, E> {
        this.error = error;
        this.hasValue = false;
        return this;
    }
}