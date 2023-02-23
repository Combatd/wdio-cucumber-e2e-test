# v8 CHANGES

1. Use full file extension when importing project files
  - Optionally enable ```"typescript.preferences.importModuleSpecifierEnding": "js"```
2. 'browser.config' -> 'browser.options'
3. When merging env specific config file, add all the keys to  'before' hook to make the key availab;e to 'browser.options' object