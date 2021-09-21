let winning_list =[
    {
        image:1,
        amount:"15lakh",
        rank:1
    },
    {
        image:2,
        amount:"1,06,345",
        rank:1
    },
    {
        image:3,
        amount:"1,00,300",
        rank:4
    },
    {
        image:4,
        amount:"51,225",
        rank:1
    },
    {
        image:5,
        amount:"25,000",
        rank:1
    },
    {
        image:6,
        amount:"10,000",
        rank:1
    },
    {
        image:7,
        amount:"9,911",
        rank:37
    },
    {
        image:8,
        amount:"5,691",
        rank:56
    },
    {
        image:9,
        amount:"8,500",
        rank:17
    },
    {
        image:10,
        amount:"50000",
        rank:1
    },
    {
        image:11,
        amount:"5,000",
        rank:1
    },
    {
        image:12,
        amount:"5,000",
        rank:1
    },
    {
        image:13,
        amount:"6,000",
        rank:1
    },
    {
        image:14,
        amount:"5,000",
        rank:1
    },
    {
        image:15,
        amount:"3,565",
        rank:43
    }
]
rank = document.querySelector('#rank')
winning_amount = document.querySelector('#winning_amount')
winning_image = document.querySelector('#winning_image')
winning_cnt = 1
winning_length = winning_list.length
setInterval(()=>{
if(winning_cnt==winning_length)
    winning_cnt = 0 
rank.textContent=winning_list[winning_cnt].rank
winning_amount.textContent=winning_list[winning_cnt].amount
winning_image.src = `winning_images/${winning_list[winning_cnt].image}.jpg`
winning_cnt = winning_cnt + 1
},2500)