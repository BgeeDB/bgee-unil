# Blocks

### Grid
````js
const block = {
  type: 'title',
  content: [
    // array of blocks 
  ],
  cols: number
};
````

### Title
````js
const block = {
  type: 'title',
  content: 'xxx'
};
````

### Text
````js
const block = {
  type: 'text',
  content: 'xxx'
};
````

### Rich Text
````js
const block = {
  type: 'rich_text',
  content: [
    // array of rich blocks 
  ]
};
````

### Link Image
````js
const block = {
  type: 'link_image',
  alt: 'xxx',
  path: 'xxx',
  src: 'xxx',
  style: 'xxx'
};
````

### Bold
````js
const block = {
  type: 'bold',
  content: 'xxx'
};
````

### Unordered List
````js
const block = {
  type: 'unordered_list',
  children: [
    // array of blocks
  ]
};
````

### Section
````js
const block = {
  type: 'section',
  title: 'string',
  children: [
    // array of blocks
  ]
};
````


# Rich blocks
##### Break Line
````js
const block = {
  type: 'break_line',
};
````
##### Bold
````js
const block = {
  type: 'bold',
  content: 'xxx'
};
````
##### Code
````js
const block = {
  type: 'code',
  content: 'xxx'
};
````
##### Text
````js
const block = {
  type: 'text',
  content: 'xxx'
};
````
##### Internal Link
````js
const block = {
  type: 'link_internal',
  path: 'xxx',
  text: 'xxx'
};
````
##### External Link
````js
const block = {
  type: 'link_external',
  path: 'xxx',
  text: 'xxx'
};
````