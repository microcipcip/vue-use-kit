# getQuery

getQuery is an utility function that helps you build a min max media query.

## Reference

```typescript
getQuery(
    min?: number, 
    max?: number
): string
```

### Parameters

- `min: number` the min value to use to build the media query
- `max: number` the max value to use to build the media query

### Returns

- `query: string` the media query value

## Usage

```typescript
import { getQuery } from 'vue-use-kit'

const query = getQuery(0, 300)
// only screen and (max-width: 299px)

const query = getQuery(300, 1024)
// only screen and (min-width: 300px) and (max-width: 1023px)

const query = getQuery(1024)
// only screen and (min-width: 1024px)
```
