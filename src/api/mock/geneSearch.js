const geneSearch = {
  autoCompleteSearchGenes: (val) =>
    new Promise((res) =>
      res({
        code: 200,
        status: 'SUCCES',
        data: [
          {
            name: 'HBB',
            link: 'https://bgee.org/?page=gene&query=HBB',
          },
          {
            name: 'Apoc1',
            link: 'https://bgee.org/?page=gene&query=Apoc1',
          },
          {
            name: 'PDE4DIP',
            link: 'https://bgee.org/?page=gene&query=PDE4DIP',
          },
          {
            name: 'insuline',
            link: 'https://bgee.org/?page=gene&query=insuline',
          },
        ],
      })
    ),
};
export default geneSearch;
