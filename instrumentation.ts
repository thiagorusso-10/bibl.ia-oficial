/**
 * Next.js Instrumentation Hook
 * Runs once when the server starts, BEFORE any request handling.
 * Used to apply DNS fix for corporate networks.
 */
export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const dns = await import("node:dns");

        const origLookup = dns.default.lookup as any;
        (dns.default as any).lookup = function patchedLookup(
            hostname: string,
            options: any,
            callback?: any
        ) {
            const cb = typeof options === "function" ? options : callback;
            const opts = typeof options === "function" ? {} : options;

            origLookup(
                hostname,
                opts,
                (err: any, address: any, family: any) => {
                    if (!err) return cb(null, address, family);

                    dns.default.resolve4(
                        hostname,
                        (err4: any, addresses: string[]) => {
                            if (!err4 && addresses.length > 0) {
                                return cb(null, addresses[0], 4);
                            }
                            dns.default.resolve6(
                                hostname,
                                (err6: any, addresses6: string[]) => {
                                    if (!err6 && addresses6.length > 0) {
                                        return cb(null, addresses6[0], 6);
                                    }
                                    cb(err);
                                }
                            );
                        }
                    );
                }
            );
        };
    }
}
