## Props

All (Or almost all) helpers and modifiers of bulma are implemented as a prop inside the Element component (and on every
component on the library), here you can find a list of all common props between all components

`bool`
`'ccccccccc'` 

| Name | Description | Default |
|------|-------------|---------|
| renderAs | `string` `func` `object` | `'div'`  |
| alignContent | `'flex-start'` `'flex-end'` `'center'` `'space-around'` `'space-between'` `'space-evenly'` `'stretch'` `'start'` `'end'` `'baseline'` | - |
| alignItems |  `'auto'` `'flex-start'` `'flex-end'` `'center'` `'baseline'` `'stretch'` | - |
| backgroundColor | `'primary'` `'link'` `'info'` `'success'` `'warning'` `'danger'` `'dark'` `'text'` `string` | - |
| className |  `string` | - |
| clearfix |  `bool` | - |
| clickable |  `bool` | - |
| clipped |  `bool` | - |
| colorVariant | `light` `dark` | - |
| display | `'block'` `'flex'` `'inline'` `'inline-bloc'` `'inline-flex'` `'relative'` `'hidden'` | - |
| domRef | Reference to Dom element `object` | - |
| flexDirection | `row` `row-reverse` `column` `column-reverse` | - |
| flexWrap | `'nowrap'` `'wrap'` `'wrap-reverse'` | - |
| flexGrow | `0` `1` `2` `3` `4` `5` | - |
| italic |  `bool` | - |
| invisible | `bool`  | - |
| justifyContent | `'flex-start'` `'flex-end'` `'center'` `'space-around'` `'space-between'` `'space-evenly'` `'start'` `'end'` `'left'` `'right'` | - |
| m | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| mt | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| mr | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| mb | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| ml | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| mx | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| my | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| marginless | `bool` | - |
| overlay | `bool` | - |
| paddingless | `bool` | - |
| p | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| pt | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| pr | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| pb | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| pl | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| px | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| py | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| pull | `undefined` `'right'` `'left'` | - |
| radiusless | `bool` | - |
| shadowless | `bool`  | - |
| textAlign | `'center'` `'justify'` `'left'` `'right'` | - |
| textColor | `'primary'` `'link'` `'info'` `'success'` `'warning'` `'danger'` `'dark'` `'text'` `string` | - |
| textFamily | `string`  | - |
| textSize | `0` `1` `2` `3` `4` `5` `6` `number` `string` | - |
| textTransform | `'capitalized'` `'lowercase'` `'uppercase'` | - |
| textWeight | `'light'` `'normal'` `'semibold'` `'bold'` | - |
| unselectable | `bool` | - |

There is also a set of props to handle responsive design:

`mobile`, `tablet` `desktop`, `widescreen`, `fullhd`, `touch`, `untilWidescreen`, `untilFullhd`

Each of these properties values corresponds to the following `object`.
````javascript
{
  textSize: 1 | 2 | 3 | 4 | 5 | 6 | 7 | string | number, 
  textAlign: 'center' | 'justify' | 'left' | 'right',
  display: 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'hidden',
  invisible: boolean, 
  only: boolean
}
````