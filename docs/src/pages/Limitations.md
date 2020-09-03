# Limitations

- `<router-link>` is not supported. [#15][]
- Optional params like `/:id?` and `/:id*` are not supported for now. [#34][]
- Adding routes dynamically is not supported.
  - `router.addRoute`/`router.removeRoute` is disabled. Although you can call this function using `as Router`. This will break types of `router.push` and so on.

[#15]: https://github.com/sapphi-red/vue-routider/issues/15
[#34]: https://github.com/sapphi-red/vue-routider/issues/34
