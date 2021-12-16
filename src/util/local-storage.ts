import { useEffect, useRef, useState } from "react";

const prefixKey = (key: string) => `react-holiday-ui-${key}`;

class LocalStorageEventTarget extends EventTarget {
    constructor() {
        super();
    }

    public send(key: string, value: any) {
        const event = new CustomEvent("localstorage", { detail: { key, value } });
        this.dispatchEvent(event);
    }

}
const localStoreEventTarget = new LocalStorageEventTarget();

export const LocalStorageKeys = {
    ALL: prefixKey('all'),
}

export const useLocalStorageState = <U extends any>(key: string, initialValue: any): [U | undefined, (newValue: U) => void] => {
    const [value, _setValue] = useState<U>();
    const hasReadInitialValue = useRef(false);

    const setValue = (newValue: any) => {
        try {
            const valueToStore =
                typeof newValue === "object" ? JSON.stringify(newValue) : newValue;
            window.localStorage.setItem(key, valueToStore);
            localStoreEventTarget.send(key, valueToStore);
            _setValue(newValue);
        } catch (error) {
            console.error("react-holiday-ui: ", error);
        }
    };

    // Subscribe to local storage changes
    useEffect(() => {
        const handler = (event: CustomEvent) => {
            if (event.detail.key === key && event.detail.value != null) {
                _setValue(event.detail.value);
            }
        }
        localStoreEventTarget.addEventListener('localstorage', handler);

        return () => {
            localStoreEventTarget.removeEventListener('localstorage', handler);
        }
    }, []);

    if (!hasReadInitialValue.current) {
        const item = window.localStorage.getItem(key);
        const parsedValue = item ? JSON.parse(item) : undefined;
        const returnedValue = parsedValue != null ? parsedValue : initialValue;
        hasReadInitialValue.current = true;
        setValue(returnedValue);
        return [returnedValue, setValue];
    }

    return [value, setValue];
}

export const useReactHolidayUI = () => {
    const [isActive, setIsActive] = useLocalStorageState<boolean>(LocalStorageKeys.ALL, true);

    return {
        isActive,
        setIsActive,
        toggleIsActive: () => setIsActive(!isActive),
    };
}