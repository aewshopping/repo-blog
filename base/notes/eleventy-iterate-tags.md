---
date: 2025.06.08
tags: [eleventy, nunjucks]
title: Render a list of all tags in eleventy 
---
# Render a list of all tags in eleventy

The various googlings on how to achieve this all looked over engineered, invovling shortcodes and whatnot. This seemed to be the simplest way of doing it. Everything goes within your post, nothing needed in the config:

```nunjucks
{% for eachtag, notes in collections %}
  {{ eachtag }}
{% endfor %}
```

- The `collections` object is specially created by eleventy with each unique tag name forming a child of `collections`.
- Tags typically come from the yaml front matter on a post where the keyword `tags` is used - ie `tags: gorgonzola`.
- In the above nunjucks code therefore `notes` is an arbitrary word (you could use `posts` for example).
- Equally `eachtag` is also an arbitrary word, you could use `thingymajig` or whatever.


You can also easily list the notes (posts, whatever) under each tag:

```nunjucks
{% for eachtag, notes in collections %}
  {{ eachtag }}
  {% for note in notes %}
    {{ note.data.title }}
  {% endfor %}
{% endfor %}
```

One thing that can be a bit of a pain is how whitespace is interpreted - this is the case with nunjucks in general.

You can "erase" whitespace by using `-` ie this `{%- something -%}` rather than this `{% something %}`.

Putting it all together and adding a few flourishes I ended up with this (noting I have a custom myDate filter):

```nunjucks
{% for eachtag, notes in collections | dictsort -%}
### `{{ eachtag }}` ({{ notes | length }})
{% for note in notes | reverse -%}
- {{ note.data.title }} ({{ note.page.date | myDate }})
  {%- for tag in note.data.tags %} `{{ tag }}`{% endfor %}
{% endfor -%}
{% endfor -%}
```
Finally this all works with `tags` which are special in eleventy. But if you create your own front matter "tag" ie `category: cambert` none of the above will work and I'm pretty sure you will need to create a shortcode or something along these lines in the config.
