const modules = import.meta.glob('./*.js', {eager: true});
console.log(modules);
