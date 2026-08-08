import { useEffect, useState } from 'react';
import { detectAdblock } from './detect';
import { AdblockDetectionState } from './types';

/**
 * React hook wrapping `detectAdblock`. Runs the check once on mount and
 * guards against setting state after unmount, since the underlying check
 * resolves asynchronously (script load/error/XHR callback).
 *
 * @example
```tsx
const { detected, loading } = useAdblockDetector();
if (loading) return null;
return detected ? <DetectorModal closeBtn onModalClose={...} /> : <MyApp />;
```
 */
export const useAdblockDetector = (): AdblockDetectionState => {
    const [state, setState] = useState<AdblockDetectionState>({
        detected: false,
        loading: true,
    });

    useEffect(() => {
        let cancelled = false;

        detectAdblock((detected) => {
            if (cancelled) return;
            setState({ detected, loading: false });
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}
