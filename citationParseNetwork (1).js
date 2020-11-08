const fs = require('fs')

const rawData = fs.readFileSync('/workspace/JSON-Extract-and-Dataset-Creation/input/papers2_v3.json')
const papers = JSON.parse(rawData)
var authors = [],
    reference_list = [],
    ref_authors_list = [],
    c1 = 0,
    c2 = 0;
    

fs.writeFileSync('authors3_continued_4800001.txt', '')

papers.forEach(paper => {
    c1++
    if(c1>4800001) {
        authors = []
        if(paper.authors){
            paper.authors.forEach(author => {
                authors.push(author.id)
            })
        }
        if(paper.references) {
            var size = paper.references.length
        } else {
            var size = undefined
        }
        
        
        reference_list = []
        if(paper.references) {
            ref_authors_list = []
            paper.references.forEach(reference => {
                reference_list.push(reference)
            })
            papers.some(paper => {
                if(reference_list.includes(paper.id)){
                    size--
                    paper.authors.some(author => {
                        ref_authors_list.push(author.id)
                    })
                    if(size == 0) {
                        return true
                    }
                }
            })
        } else {
            ref_authors = []
        }
        authors.forEach(author => {
            ref_authors_list.forEach(ref_auth => {
                fs.appendFileSync('authors3_continued_4800001.txt', `${author} ${ref_auth}\n`, 'utf8')
                console.log(`${c1} ${c2++} ${author} ${ref_auth}`)
            })
        })
    }
});