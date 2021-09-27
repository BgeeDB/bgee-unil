### Button
````
{
    renderAs: funct, string, object
    color: 'primary', 'link', 'info', 'success', 'warning', 'danger', 'dark', 'text', string
    size: 'small', 'medium', 'large', string
    outlined: bool, Whether Button should have an outline.
    inverted: bool, Whether Button should have an inverted color scheme. Useful when button is used on colored background
    submit: bool
    reset: bool
    status: 'focus', 'hover', 'active'
    loading: bool
    fullWidth: bool, Whether Button should occupy the full width of parent
    disabled: bool
    remove: bool
    isSelected: bool, Whether Button is selected. Useful in a Button.Group.
    isStatic: bool, Whether Button is non-interactive/static.
    rounded: bool, Whether Button should have fully-rounded corners.
    text: bool, Whether Button is a text button.
}
````

### Button group
````
{
    renderAs: funct, string, object
    hasAddons: bool
    size: 'small', 'medium', 'large' (The size of all the buttons in the group.)
    align: 'center', 'right' (Align of the group. By default, it is left-aligned.)
}
````