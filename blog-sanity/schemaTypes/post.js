export default {
    name: 'post',
    title: 'post',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type:'string'},
        {name:'description', title: 'Description', type:'array', of: [{type: 'block'}]},
        {name: 'publishedAt', title: 'PublishedAt', type:'datetime'},
    ],
}