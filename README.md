# 👫 Seriousmad

> a pun of serious mum and dad

## Usage

> you must have installed NPM v3+

Make sure you have instlled Grunt globally

```sh
npm i -g grunt-cli
```

Install the dependencies

```sh
npm i
```

### Build

**Dev**

Build the developing code. The builded files are stored in `tmp`

```sh
grunt build:dev
```

**Production**

Build the production ready code. The builded files are stored in `dist`

```sh
grunt build:prod
```

or

```sh
grunt
```

### Live Developing

For developing with live reloading in a browser use:

```sh
grunt serve:dev
```