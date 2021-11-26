import 'd3-transition'

function fadeInOut(selection: d3.Selection<any, any, any, any>): void {
  let nToFinish = selection.size()
  selection.transition()
    .duration(5000)
    .delay((_: any, i: number) => i * 50)
    .attr('opacity', 1)
    .transition()
    .duration(5000)
    .delay((_: any, i: number) => i * 50)
    .attr('opacity', 0)
    .on('end', () => {
      nToFinish = nToFinish - 1
      if(nToFinish <= 0) fadeInOut(selection)
    })
}

export default fadeInOut
