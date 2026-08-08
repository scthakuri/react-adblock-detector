import React, { useState } from 'react';
import DetectorModal from './DetectorModal';
import { useAdblockDetector } from './useAdblockDetector';
import { DetectorModalType } from './types';

/**
 * Combines `useAdblockDetector` and `DetectorModal` into one drop-in
 * component: detects on mount and shows the modal automatically, renders
 * nothing otherwise. Dismissing via the close button (`closeBtn`) hides it
 * for the rest of the session. Accepts the same props as `DetectorModal`.
 */
export function AutoDetectorModal(props: DetectorModalType): JSX.Element | null {
    const { detected, loading } = useAdblockDetector();
    const [dismissed, setDismissed] = useState(false);

    if (loading || !detected || dismissed) return null;

    return (
        <DetectorModal
            {...props}
            onModalClose={() => {
                setDismissed(true);
                props.onModalClose?.();
            }}
        />
    );
}
