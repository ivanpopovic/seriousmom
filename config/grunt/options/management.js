module.exports = {
	concat: {
		js: {
			files: [
				{
					src: [
						"<%= paths.src.files.assets.js %>",
						"<%= paths.src.ignore.couldBeVendor %>"
					],
					dest: "<%= paths.tmp.folder.assets.js %>/main.js"
				}
			]
		},
		vendor: {
			files: [
				{
					src: [
						"<%= paths.tmp.folder.assets.js %>/bower.js",
						"<%= paths.src.files.couldBeVendor.js %>",
						"<%= paths.vendor.js %>",
						"<%= paths.src.ignore.min %>"
					],
					dest: "<%= paths.tmp.folder.assets.js %>/vendor.js"
				}
			]
		},
		tests: {
			files: {
				"<%= paths.tmp.folder.tests.base %>/js/tests.js": "<%= paths.src.tests %>",
				"<%= paths.tmp.folder.tests.js %>/instrument.js": "<%= paths.tmp.files.instrumented %>",
				"<%= paths.tmp.folder.tests.js %>/vendor.js": [
					"<%= paths.tmp.folder.assets.js %>/bower.js",
					"<%= paths.src.files.couldBeVendor.js %>",
					"<%= paths.vendor.js %>",
					"<%= paths.src.ignore.min %>"
				]
			}
		},
		scss: {
			options: {
				process: function (src, filepath) {
					return '/* Source: ' + filepath + '*/\n' + src
				}
			},
			files: [
				{
					src: "<%= paths.src.files.scss %>",
					dest: "<%= paths.src.folder.assets.scss %>/createdFileByGrunt.scss"
				}
			]
		},
		css: {
			options: {
				process: function (src, filepath) {
					return '/* Source: ' + filepath + '*/\n' + src
				}
			},
			files: [
				{
					src: [
						"<%= paths.vendor.css %>",
						"<%= paths.tmp.folder.assets.css %>/SassFiles.css",
						"<%= paths.src.files.css %>"
					],
					dest: "<%= paths.tmp.folder.assets.css %>/global.css"
				}
			]
		}
	},
	bower_concat: {
		all: {
			dest: "<%= paths.tmp.folder.assets.js %>/bower.js",
			bowerOptions: {},
			dependencies: {},
			process: function (src) {
				"\n;(function( window, undefined ){ \n 'use strict';\n\n" +
				src +
				"\n\n}( window ));"
			},
			callback: function (file, comp) {
				return file;
			}
		}
	},
	sass: {
		dev: {
			src: "<%=  paths.src.folder.assets.scss %>/createdFileByGrunt.scss",
			dest: "<%= paths.tmp.folder.assets.css %>/SassFiles.css"
		}
	},
	clean: {
		tmp: {
			src: "<%= paths.tmp.base %>"
		},
		dist: {
			src: "<%= paths.dest.base %>"
		},
		cache: {
			src: "<%= paths.cache.scss %>"
		},
		createdSassByGrunt: {
			src: [
				"<%= paths.src.folder.assets.scss %>/createdFileByGrunt.scss",
				"<%= paths.tmp.folder.assets.css %>/SassFiles.css"
			]
		},
		bower: {
			src: "<%= paths.tmp.folder.assets.js %>/bower.js"
		},
		template: {
			src: "<%= paths.tmp.folder.assets.js %>/template.js"
		}
	},
	copy: {
		dev: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.src.folder.assets.base %>",
					src: [
						"img/**",
						"svg/**",
						"json/**"
					],
					dest: "<%= paths.tmp.folder.assets.base %>"
				},
				{
					expand: true,
					cwd: "<%= paths.src.base %>",
					src: [
						"**/*.{html,php}",
						"!**/app/**/*.html"
					],
					dest: "<%= paths.tmp.base %>/"
				}
			]
		},
		prod: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.src.folder.assets.base %>",
					src: [
						"img/**",
						"svg/**",
						"json/**"
					],
					dest: "<%= paths.dest.folder.assets.base %>"
				},
				{
					expand: true,
					cwd: "<%= paths.src.base %>",
					src: [
						"**/*.{html,php}",
						"!**/app/**/*.html"
					],
					dest: "<%= paths.dest.base %>"
				}
			]
		},
		cache_sass: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.src.base %>",
					src: "**/*.scss",
					dest: "<%= paths.cache.sass %>"
				}
			]
		},
		vendor: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.tmp.folder.assets.js %>",
					src: "vendor.js",
					dest: "<%= paths.dest.folder.assets.js %>",
					ext: ".min.js"
				}
			]
		},
		tests: {
			files: [
				{
					expand: true,
					cwd: "./config/test",
					src: [
						"**"
					],
					dest: "<%= paths.tmp.folder.tests.base %>"
				}
			]
		}
	},
	cdnify: {
		prod: {
			options: {
				rewriter: function (url) {
					var arr = url.split('.');

					if (arr[arr.length - 2] !== 'min') {
						arr.splice((arr.length - 1), 0, 'min');
					}

					return arr.join('.');
				},
				css: false,
				html: {
					"img[src]": false,
					"video[poster]": false,
					"source[src]": false
				}
			},
			files: [
				{
					expand: true,
					cwd: "<%= paths.dest.base %>",
					src: [
						"**/*.{php,html}"
					],
					dest: "<%= paths.dest.base %>"
				}
			]
		}
	},
	jsdoc: {
		documentation: {
			src: [
				"<%= paths.src.allFiles.js %>",
				"<%= paths.src.ignore.couldBeVendor %>"
			],
			dest: "<%= paths.tmp.folder.docs.base %>"
		}
	}
};