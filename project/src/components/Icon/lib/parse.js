'use strict'

function SVGtoArray (svgObj) {
  var convertShapeToPath = require('./convertShapeToPath')
  var SVGArray = []
  var node = void 0
  var subNode = void 0
  var groupNode = void 0
  var subsubNode = void 0

  for (node in svgObj) {
    if (node === 'rect' || node === 'circle' || node === 'ellipse' || node === 'polygon' || node === 'line' || node === 'path') {
      var _iteratorNormalCompletion = true

      try {
        for (var _iterator = svgObj[node][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          subNode = _step.value
          SVGArray.push(convertShapeToPath(subNode.$, node))
        }
      } catch (err) {
        throw err
      } finally {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator3.return()
        }
      }
    } else if (node === 'g') {
      var _iteratorNormalCompletion2 = true

      try {
        for (var _iterator2 = svgObj[node][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          groupNode = _step2.value

          for (subNode in groupNode) {
            if (node === 'rect' || node === 'circle' || node === 'ellipse' || node === 'polygon' || node === 'line' || node === 'path') {
              var _iteratorNormalCompletion3 = true

              try {
                for (var _iterator3 = groupNode[subNode][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  subsubNode = _step3.value
                  SVGArray.push(convertShapeToPath(subsubNode.$, subNode))
                }
              } catch (err) {
                throw err
              } finally {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return()
                }
              }
            }
          }
        }
      } catch (err) {
        throw err
      } finally {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return()
        }
      }
    }
  }
  return SVGArray
}

export default SVGtoArray
