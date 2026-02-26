/**
 * DNS Fix for corporate networks that add DNS suffixes.
 * Must be imported BEFORE any module that uses dns.lookup (like postgres.js).
 *
 * Problem: Corporate DNS adds suffix (e.g., .inabrasil.com) to hostnames,
 * causing dns.lookup to fail with ENOTFOUND for external services.
 *
 * Solution: Monkey-patch dns.lookup to fall back to dns.resolve4/resolve6
 * when the system lookup fails.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dns from "node:dns";

const origLookup = dns.lookup as any;

(dns as any).lookup = function patchedLookup(
    hostname: string,
    options: any,
    callback?: any
) {
    const cb = typeof options === "function" ? options : callback;
    const opts = typeof options === "function" ? {} : options;

    origLookup(hostname, opts, (err: any, address: any, family: any) => {
        if (!err) return cb(null, address, family);

        // System lookup failed — try pure DNS resolve
        dns.resolve4(hostname, (err4, addresses) => {
            if (!err4 && addresses.length > 0) {
                return cb(null, addresses[0], 4);
            }
            dns.resolve6(hostname, (err6, addresses6) => {
                if (!err6 && addresses6.length > 0) {
                    return cb(null, addresses6[0], 6);
                }
                cb(err); // All failed
            });
        });
    });
};
