let update_player_count = function(sport_id)
{
  //  console.log("we are here")
  cp = document.getElementById('choose_player')
  cp.classList.remove('without-size')
  cp.classList.add('with-size')
  vp_1 = document.querySelectorAll('.without-size')
    vp_1.forEach((ele)=>
    {
        ele.style.height=`${(sh*0.72)}px`
    })
    vp_2 = document.querySelectorAll('.with-size')
    vp_2.forEach((e)=>
    {
        e.style.height=`${(sh*0.45)}px`
    })
   team_one = document.querySelectorAll('.team_one_data')
   team_two = document.querySelectorAll('.team_two_data')
   let team_one_cnt=0 
   let team_two_cnt=0
   let pc = document.querySelector('#player_count')
   team_one.forEach((obj)=>
   {
       if(Array.from(obj.classList).includes('border-green'))
        team_one_cnt++
   })
   team_two.forEach((obj)=>
   {
       if(Array.from(obj.classList).includes('border-green'))
        team_two_cnt++
   })
   //console.log(team_one_cnt,team_two_cnt)
   if((team_one_cnt+team_two_cnt)>0)
   {
        pc.style.display="block"
        update_team_details(team_one,team_two,sport_id)
   }
   else
   {
    cp = document.getElementById('choose_player')
    cp.classList.remove('with-size')
    cp.classList.add('without-size')
    vp_1 = document.querySelectorAll('.without-size')
    vp_1.forEach((ele)=>
    {
        ele.style.height=`${(sh*0.72)}px`
    })
    vp_2 = document.querySelectorAll('.with-size')
    vp_2.forEach((e)=>
    {
        e.style.height=`${(sh*0.45)}px`
    })
       pc.style.display="none"
   }
}

let update_team_details = function(team_one,team_two,sport_id)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE']
    ]
    role_value = all_value[sport_id]
    one_cnt_arr=[]
    two_cnt_arr=[]
    for(let i=0;i<role_value.length;i++)
        one_cnt_arr.push(0)
    for(let i=0;i<role_value.length;i++)
        two_cnt_arr.push(0)
   
    team_one.forEach((obj)=>
    {
        if(Array.from(obj.classList).includes('border-green'))
        {
            role = obj.querySelector('#player_role').textContent
            one_cnt_arr[role_value.indexOf(role)]+=1
            one_cnt_arr[0]+=1
        }
    })
    team_two.forEach((obj)=>
    {
        if(Array.from(obj.classList).includes('border-green'))
        {
            role = obj.querySelector('#player_role').textContent
            two_cnt_arr[role_value.indexOf(role)]+=1
            two_cnt_arr[0]+=1
        }
    })
    fvp = document.querySelector('#first_vp_placer')
    svp = document.querySelector('#second_vp_placer')
    tvp = document.querySelector('#total_vp_placer')
    //<div class="d-flex flex-column m-1 justify-content-center align-items-center" ><b>WK</b><b id="first_wk">(1)</b></div>
    for(let i=0;i<role_value.length;i++)
    {
        if(fvp.childElementCount!=role_value.length)
        {
        ele = document.createElement('div')
        ele.classList.add('d-flex','flex-column','m-1','justify-content-center','align-items-center')
        b=document.createElement('b')
        b_s=document.createElement('b')
        b_s.classList.add('vk')
        if(i==role_value.length-1){
            b.textContent="TOTAL"
            b_s.textContent=`(${one_cnt_arr[0]})`
        }
        else{
            b.textContent=role_value[i+1]
            b_s.textContent=`(${one_cnt_arr[i+1]})`
        }
        ele.appendChild(b)
        ele.appendChild(b_s)
        fvp.appendChild(ele)
        }
        else{
           // console.log(fvp.children)
            Array.from(fvp.children).forEach((ele,index)=>
            {
                if(index==role_value.length-1)
                ele.querySelector('.vk').textContent=`(${one_cnt_arr[0]})`
                else
                ele.querySelector('.vk').textContent=`(${one_cnt_arr[index+1]})`
            })
        }
    }
    for(let i=0;i<role_value.length;i++)
    {
        if(svp.childElementCount!=role_value.length)
        {
        ele = document.createElement('div')
        ele.classList.add('d-flex','flex-column','m-1','justify-content-center','align-items-center')
        b=document.createElement('b')
        b_s=document.createElement('b')
        b_s.classList.add('vk')
        if(i==role_value.length-1){
            b.textContent="TOTAL"
            b_s.textContent=`(${two_cnt_arr[0]})`
        }
        else{
            b.textContent=role_value[i+1]
            b_s.textContent=`(${two_cnt_arr[i+1]})`
        }
        ele.appendChild(b)
        ele.appendChild(b_s)
        svp.appendChild(ele)
        }
        else{
            Array.from(svp.children).forEach((ele,index)=>
            {
                if(index==role_value.length-1)
                ele.querySelector('.vk').textContent=`(${two_cnt_arr[0]})`
                else
                ele.querySelector('.vk').textContent=`(${two_cnt_arr[index+1]})`
            })
        }
    }

   for(let i=0;i<role_value.length;i++)
    {
        if(tvp.childElementCount!=role_value.length)
        {
        ele = document.createElement('div')
        ele.classList.add('d-flex','flex-column','m-1','justify-content-center','align-items-center')
        b=document.createElement('b')
        b_s=document.createElement('b')
        b_s.classList.add('vk')
        if(i==role_value.length-1){
            b.textContent="TOTAL"
            b_s.textContent=`(${one_cnt_arr[0]+two_cnt_arr[0]})`
        }
        else{
            b.textContent=role_value[i+1]
            b_s.textContent=`(${one_cnt_arr[i+1]+two_cnt_arr[i+1]})`
        }
        ele.appendChild(b)
        ele.appendChild(b_s)
        tvp.appendChild(ele)
        }
        else{
            Array.from(tvp.children).forEach((ele,index)=>
            {
                if(index==role_value.length-1)
                ele.querySelector('.vk').textContent=`(${one_cnt_arr[0]+two_cnt_arr[0]})`
                else
                ele.querySelector('.vk').textContent=`(${one_cnt_arr[index+1]+two_cnt_arr[index+1]})`
            })
        }
    }

}