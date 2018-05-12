'use strict'

let isEdge = /Edge\//.test(navigator.userAgent)

if (isEdge) { document.body.dataset.edge = '' }
