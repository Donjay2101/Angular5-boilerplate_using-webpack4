import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';


if(process.env.ENV === 'build') {

} else {
    Error['stackTraceLimit'] = Infinity;    
    
}


