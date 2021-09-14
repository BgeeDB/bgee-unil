# Bulma CSS to React

Take a look at [Bulma CSS documentation](https://bulma.io/documentation) first to understand how it works.
The library provides shortcut about every Bulma components.

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

## renderAs

Under the hood, each Bulma component has a specified default renderAs component that they will use to render, along with all the generated Bulma classes.

For example, `Container` is rendered as:
````html
<div class="container ...">
````

Every Bulma component accepts attributes or props of the elements or components they will be rendered as. `Container` accepts all HTML attributes of `<div>`, and `Button` accepts all HTML attributes of `<button>`.

Sometimes, however, you may want a Bulma component to be rendered as another React component or as another HTML element. This is where the `renderAs` prop that is available to every component comes in handy.

#### Render with a different HTML element

You can use the `renderAs` prop to specify what HTML element you want the component to render with. For example, a `Button` can be rendered as an `input` instead of a `button`:
````html
<Button renderAs="input" />
````

`Button` will now be rendered as an `<input>`; all the attributes of `<input>` is also available as props.
