const removeLeadingNumbers = (inputString: string): string => {
    let result = inputString;
    while (/^\d/.test(result)) {
        result = result.slice(1);
    }
    return result;
}

/**
 * Small, fast, synchronous string hash (djb2 variant, hex-encoded). Class
 * names only need to be deterministic-per-session, not cryptographically
 * secure, so this replaces the package's previous crypto-js dependency.
 */
const hash = (input: string): string => {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < input.length; i++) {
        const ch = input.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

const decodeClassCache: Record<string, string> = {};

/**
 * Deterministically derives an obfuscated class name from a stable name and
 * a per-session key, memoized per (className, sessionKey) pair.
 */
export const decodeClass = (className: string, sessionKey: string): string => {
    const cacheKey = className + '::' + sessionKey;
    const cached = decodeClassCache[cacheKey];
    if (cached) {
        return cached;
    }

    const newClassName = className + sessionKey + className;
    const decoded = removeLeadingNumbers(hash(newClassName));
    decodeClassCache[cacheKey] = decoded;
    return decoded;
}

/** @deprecated use `decodeClass` */
export const decode_class = decodeClass;
