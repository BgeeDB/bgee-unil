## To use

````
// App.js
import 'bulma/css/bulma.min.css';
````

## The Element component

Under the hood, every Bulma component renders an <Element /> component that serves as a layer of abstraction over plain HTML element.

This layer is required in order to support Bulma helpers for every component. It also gives components flexibility to be rendered as different components. The layer provides every component a set of common props that you can use to utilize Bulma helpers and customize how components are rendered.

`The library` provides support for Bulma helpers in the form of common props among all components.

Unless otherwise specified, all props described below are available to all components.

Check the documentation about Element for more information.

## Responsive 

Visibility/Responsive helpers

You can control de visibility of each component per breakpoint, See the following table for details

| Mobile up to `768px` | Tablet between `769px` and `1023px` | Desktop between `1024px` and `1407px` | Widescreen between `1216px` and `1407px` | FullHD `1408px` and above |
|---|---|---|---|---|
| `mobile` |  |  |  |  |
|  | `tablet` | `tablet` | `tablet` | `tablet` |
|  |  | `desktop` | `desktop` | `desktop` |
|  |  |  | `widescreen` | `widescreen` |
|  |  |  |  | `fullhd` |
|  | `tablet-only` |  |  |  |
|  |  | `desktop-only` |  |  |
|  |  |  | `widescreen-only` |  |
| `touch` | `touch` |  |  |  |
| `until-widescreen` | `until-widescreen` | `until-widescreen` |  |  |
| `until-fullhd` | `until-fullhd` | `until-fullhd` | `until-fullhd`  |  |

Check the documentation about Element for more information.