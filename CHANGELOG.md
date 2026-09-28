# Changelog

## Unreleased

- Fix tenant impersonation and self-tenant redirects when the CRM URL has a trailing slash, and restore the "Login With Tenant" action after returning to the user list.
- Add a Text Direction (RTL/LTR) toolbar control to the Message Body editor, so Arabic/Hebrew and other right-to-left content can be set explicitly per paragraph and is preserved through plain-text delivery to WhatsApp via invisible Unicode direction marks, with the live preview matching the editor exactly.

## WAPI v3.2 custom upgrade - 2026-07-16

- Upgrade the admin application to the complete WAPI v3.2 vendor release.
- Preserve the custom pending plan approval alert and status-filter navigation.
- Add announcement banner and popup management.
- Refresh dashboard charts, tables, page management, permissions, subscriptions, payments, profiles, and AI model screens.
- Upgrade the application to Next.js 16.2 and regenerate the dependency lockfile.
