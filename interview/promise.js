// function JohnnyPromise(fn) {
//     const that = this
//     that.state = 'PENDING'
//     that.value = null
//     that.resolveCallbacks = []
//     that.rejectCallbacks = []

//     function johnnyResolve(val) {
//         if(that.state === 'PENDING') {
//             that.state = 'RESOLVED'
//             that.value = val
//             that.resolveCallbacks.map(cb => cb(val))
//         }
//     }

//     function johnnyReject(err) {
//         if(that.state === 'PENDING') {
//             that.state = 'REJECTED'
//             that.rejectCallbacks.map(cb => cb(err))
//         }
//     }

//     try {
//         fn(johnnyResolve, johnnyReject)
//     } catch(err) {
//         johnnyResolve(err)
//     }
    
// }

function JohnnyPromise(fn) {
    this.state = 'PENDING'
    this.value = null
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const johnnyResolve = (val) => {
        if(this.state === 'PENDING') {
            this.state = 'RESOLVED'
            this.value = val
            this.resolveCallbacks.map(cb => cb(val))
        }
    }

    const johnnyReject = (err) => {
        if(this.state === 'PENDING') {
            this.state = 'REJECTED'
            this.rejectCallbacks.map(cb => cb(err))
        }
    }

    try {
        fn(johnnyResolve, johnnyReject)
    } catch(err) {
        johnnyResolve(err)
    }
    
}

JohnnyPromise.prototype.then = function(resolve, reject) {
    onResolved = typeof resolve === 'function' && resolve
    onRejected = typeof reject === 'function' && reject
    console.log(this)
    if(this.state === 'PENDING') {
        this.resolveCallbacks.push(onResolved)
        this.rejectCallbacks.push(onRejected)
    }

    if(this.state === 'RESOLVED') {
        resolve(this.value)
    }

    if(this.state === 'REJECTED') {
        reject(this.value)
    }

}

const prom = new JohnnyPromise((resolve, reject) => {
    console.log('Invoked!')
    setTimeout(resolve, 500)
}).then((val) => console.log('value'), (val) => console.log('error'));

console.log('prom: ', prom)
// prom.then((val) => console.log('value '))
