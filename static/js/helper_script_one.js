let select_players = function(team1,team2,mn,series_index,mode,sport_id,fantasy)
{
    console.log(fantasy)




    
team_list = sd.req_data[series_index].teams_list
team_one_data = document.querySelectorAll('.team_one_data')
team_two_data = document.querySelectorAll('.team_two_data')
fi=document.querySelector('#first_image')
si=document.querySelector('#second_image')
fn=document.querySelector('#first_team_name')
sn=document.querySelector('#second_team_name')
if(sport_id==0 ||  sd.req_data[series_index].data_type==1)
{
    v_one_img = document.createElement('img')
   
    v_one_img.classList.add('my-team-image','my-team')
    v_two_img = document.createElement('img')
    v_two_img.classList.add('my-team-image','my-team')
    
    let new_flag = sd.req_data[series_index].image_present
    if(new_flag !=undefined && new_flag == 1){
        v_one_img.src = sd.req_data[series_index].team_image_list[team1]
        v_two_img.src = sd.req_data[series_index].team_image_list[team2]
    }
    else{
        v_one_img.src=`dream11_images\\${team_list[team1]}.jpg`;
        v_two_img.src=`dream11_images\\${team_list[team2]}.jpg`;
    }


    
    fi.appendChild(v_one_img)
    si.appendChild(v_two_img)
}
else
{
    v_div_one = document.createElement('div')
    h6_one = document.createElement('h6')
    h6_one.style.paddingTop="5px"
    h6_one.textContent=team_list[team1]
    v_div_one.appendChild(h6_one)
    v_div_one.style.border="1px solid black"
    v_div_one.style.backgroundColor="#F5F5F5"
    v_div_one.classList.add('my-team-image','my-team','d-flex','justify-content-center','align-items-center')

    v_div_two = document.createElement('div')
    h6_two = document.createElement('h6')
    h6_two.style.paddingTop="5px"
    h6_two.textContent=team_list[team2]
    v_div_two.appendChild(h6_two)
    v_div_two.style.border="1px solid black"
    v_div_two.style.backgroundColor="#F5F5F5"
    v_div_two.classList.add('my-team-image','my-team','d-flex','justify-content-center','align-items-center')
    fi.appendChild(v_div_one)
    si.appendChild(v_div_two)
}
fn.textContent=team_list[team1]
sn.textContent=team_list[team2]
team_one_data.forEach((obj)=>
{
    obj.addEventListener('click',()=>
    {
        if(Array.from(obj.classList).includes('border-grey'))
        {
            obj.classList.remove('border-grey')
            obj.classList.add('border-green')
        }
        else{
            obj.classList.remove('border-green')
            obj.classList.add('border-grey')
        }
        update_player_count(sport_id)
    })
})
team_two_data.forEach((obj)=>
{
    obj.addEventListener('click',()=>
    {
        if(Array.from(obj.classList).includes('border-grey'))
        {
            obj.classList.remove('border-grey')
            obj.classList.add('border-green')
        }
        else{
            obj.classList.remove('border-green')
            obj.classList.add('border-grey')
        }
        update_player_count(sport_id)
    })
})
// here
all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
all_limit=[
    [-1,1,3,1,3],
    [-1,1,3,3,1],
    [-1,1,1,1,1,1],
    [-1,1,3,1,3],
    [-1,2,1,1]
]
side_all_limit=[
    [7,7],
    [7,7],
    [5,5],
    [7,7],
    [5,5]
]
    req_side_limit=side_all_limit[sport_id]
    req_limit=all_limit[sport_id]
    role_value = all_value[sport_id]
  
// lets validate befoe doing that 
submit_players = document.getElementById('submit_players')
submit_players.addEventListener('click',()=>
{
    one_arr_cnt=[]
    for(let i=0;i<role_value.length;i++)
        one_arr_cnt.push(0)
    let team_one_cnt=0
    let team_two_cnt=0
    let index_one=[]
    let index_two=[]
    team_one_data.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes('border-green')){
            team_one_cnt+=1
            index_one.push(index)
           let temp = obj.querySelector('#player_role').textContent
           one_arr_cnt[role_value.indexOf(temp)]+=1
        }
    })
    team_two_data.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes('border-green')){
            team_two_cnt+=1
            index_two.push(index)
           let temp = obj.querySelector('#player_role').textContent
           one_arr_cnt[role_value.indexOf(temp)]+=1
        }
    })
    if(team_one_cnt<req_side_limit[0] || team_two_cnt<req_side_limit[1]){raiseError(`you should select atleast ${req_side_limit[0]} players from each team!`); return}
    jp_flag=false
    for(let i=1;i<role_value.length;i++)
    {
        if(one_arr_cnt[i]<req_limit[i]){raiseError(`There should be atleast ${req_limit[i]} ${role_value[i]}`);
         jp_flag=true;
          break;
         }
    }
    if(jp_flag) 
    return;
    console.log(index_one)
    console.log(index_two)
    pc = document.querySelector('#player_count')
    pc.style.display="none"
    cp = document.querySelector('#choose_player')
    cp.style.display="none"
    if(mode==3)
    {
    get_fixed_players(team1,team2,index_one,index_two,series_index,sport_id)
    sfp = document.getElementById('submit_fixed_players')
    all_fixed=[
        [9,7],
        [9,7],
        [5,4],
        [9,7],
        [5,4]
    ]
    req_fixed=all_fixed[sport_id]
    sfp.addEventListener('click',()=>
    {
            // i want to do something here
            fixed_team_one_players=[]
            fixed_team_two_players=[]
            fixed_cnt=0
            ftod = document.querySelectorAll('.fixed_team_one_data')
            ftod.forEach((obj,index)=>
            {
                //console.log(obj)
                if(Array.from(obj.classList).includes('border-pink')){
                    fixed_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                    //console.log(obj.querySelector('#span_name').textContent)
                    fixed_cnt++
                }
            })
            fttd = document.querySelectorAll('.fixed_team_two_data')
            fttd.forEach((obj,index)=>
            {
                if(Array.from(obj.classList).includes('border-pink')){
                    fixed_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                   // console.log(obj.querySelector('#span_name').textContent)
                   fixed_cnt++
                }
                   
            })
            if(fixed_cnt>req_fixed[0]){raiseError(`you cannont select more than ${req_fixed[0]}`);return}
            if(fixed_team_one_players.length>req_fixed[1] || fixed_team_two_players.length>req_fixed[1]){raiseError(`you cannot select more than ${req_fixed[1]} palyers as fixed from one team!`); return}
            fp = document.getElementById('fixed_player')
            fp.style.display="none"
            get_captain_players(team1,team2,index_one,index_two,series_index,sport_id)
            scp = document.getElementById('submit_captain_players')
            captain_cnt=0
            scp.addEventListener('click',()=>
            {
                captain_team_one_players=[]
                captain_team_two_players=[]
                stod = document.querySelectorAll('.captain_team_one_data')
                stod.forEach((obj,index)=>
                {
                    if(Array.from(obj.classList).includes('border-orange')){
                        captain_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                        captain_cnt++
                    }

                })
                sttd = document.querySelectorAll('.captain_team_two_data')
                sttd.forEach((obj,index)=>
                {
                    if(Array.from(obj.classList).includes('border-orange')){
                        captain_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                        captain_cnt++
                    }

                })
                if(captain_cnt<1){raiseError('Atleast select one player'); return}
                cp = document.getElementById('captain_panel')
                cp.style.display="none"
                // start the vice
                get_vice_captain_players(team1,team2,index_one,index_two,series_index,sport_id)
                svcp = document.getElementById('submit_vice_captain_players')
                vice_captain_cnt=0
                svcp.addEventListener('click',()=>
                {
                    vice_captain_team_one_players=[]
                    vice_captain_team_two_players=[]
                    vtod = document.querySelectorAll('.vice_captain_team_one_data')
                    vtod.forEach((obj,index)=>
                    {
                        if(Array.from(obj.classList).includes('border-purple')){
                            vice_captain_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                            vice_captain_cnt++
                        }

                    })
                    vttd = document.querySelectorAll('.vice_captain_team_two_data')
                    vttd.forEach((obj,index)=>
                    {
                        if(Array.from(obj.classList).includes('border-purple')){
                            vice_captain_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                            vice_captain_cnt++
                        }

                    })
                    if(vice_captain_cnt ==1 && captain_cnt==1)
                    {
                        console.log("dhada")
                        let captain_player_index=-1
                        if(captain_team_one_players.length==1)
                            captain_player_index=captain_team_one_players[0]
                        if(captain_team_two_players.length==1)
                            captain_player_index=captain_team_two_players[0]
                        let vice_captain_player_index=-1
                        if(vice_captain_team_one_players.length==1)
                            vice_captain_player_index=vice_captain_team_one_players[0]
                        if(captain_team_two_players.length==1)
                            vice_captain_player_index=vice_captain_team_two_players[0]
                        if(captain_player_index==vice_captain_player_index)
                        {
                            raiseError('You have selected same player for captain and vice captain selection!')
                            return
                        }
                    }
                    if(vice_captain_cnt<1){raiseError('Atleast select one player'); return}
                    vcp = document.getElementById('vice_captain_panel')
                    vcp.style.display="none"
                    ts = document.getElementById('team_side')
                    ts.style.display="block"
                    tsp = document.querySelector('#team_side_placer')
                    let all_vp_list=[
                        [[4,7],[5,6],[6,5],[7,4]],
                        [[4,7],[5,6],[6,5],[7,4]],
                        [[3,5],[4,4],[5,3]],
                        [[4,7],[5,6],[6,5],[7,4]],
                        [[2,5],[3,4],[4,3],[5,2]]
                    ]
                    let vp_list=all_vp_list[sport_id]
                    vp_one_cnt=fixed_team_one_players.length
                    vp_two_cnt=fixed_team_two_players.length
                    let eligible_list=[]
                    vp_list.forEach((data,index)=>
                    {
                        if(data[0]>=vp_one_cnt && data[1]>=vp_two_cnt)
                        {
                            eligible_list.push(index)
                        }
                    })
                    eligible_list.forEach((index)=>
                    {
                        main_table = document.createElement('table')
                        main_table.classList.add('mystrat','border-grey')
                        main_table.setAttribute('id','team_side_data')
                        td_one_one=document.createElement('td')
                        td_one_one.textContent='Team -1 : '
                        b_one=document.createElement('b')
                        b_two=document.createElement('b')
                        b_one.textContent=`${vp_list[index][0]}`
                        b_two.textContent=`${vp_list[index][1]}`
                        td_one_two=document.createElement('td')
                        td_one_two.appendChild(b_one)
                        td_two_one=document.createElement('td')
                        td_two_one.textContent='Team -2 : '
                        td_two_two=document.createElement('td')
                        td_two_two.appendChild(b_two)
                        span_index=document.createElement('span')
                        span_index.style.display="none"
                        span_index.textContent=index
                        span_index.setAttribute('id','span_index')
                        tr_one=document.createElement('tr')
                        tr_two=document.createElement('tr')
                        tr_one.appendChild(td_one_one)
                        tr_one.appendChild(td_one_two)
                        tr_two.appendChild(td_two_one)
                        tr_two.appendChild(td_two_two)
                        main_table.appendChild(tr_one)
                        main_table.appendChild(tr_two)
                        main_table.appendChild(span_index)
                        tsp.appendChild(main_table)
                    })
                    tsd=document.querySelectorAll('#team_side_data')
                    tsd.forEach((element)=>
                    {
                        element.addEventListener('click',()=>
                        {
                            if(Array.from(element.classList).includes('border-grey'))
                            {
                                element.classList.remove('border-grey')
                                element.classList.add('border-lime')
                            }
                            else{
                                element.classList.remove('border-lime')
                                element.classList.add('border-grey')
                            }
                        })
                    })
                    tol = document.querySelector('#team_one_label')
                    ttl = document.querySelector('#team_two_label')
                    tol.textContent=`Team one ${team_list[team1]}`
                    ttl.textContent=`Team two ${team_list[team2]}`
                    tsc=document.getElementById('team_side_continue')
                    //console.log(tso_value,tst_value)
                    tsc.addEventListener('click',()=>
                    {
                        selected_tsd=[]
                        tsd.forEach((element,index)=>
                        {
                            if(Array.from(element.classList).includes('border-lime')){
                                selected_tsd.push(Number(element.querySelector('#span_index').textContent))
                            }
                        })
                        if(selected_tsd.length<1)
                        {
                            raiseError('Select Atleast one!')
                            return;
                        }
                        ts.style.display="none"
                        cr = document.getElementById('credit_range')
                        cr.style.display="block"
                        crc =document.getElementById('credit_range_continue')
                        crc.addEventListener('click',()=>
                        {
                            csv=document.getElementById('credit_start_value').value
                            cev=document.getElementById('credit_end_value').value
                            if(csv=='' || cev=='' || Number(cev)-Number(csv)<0 || Number(cev)>100) {raiseError('Invalid Credit Range');return}
                            cr.style.display="none"
                            console.log(selected_tsd)
                            team_generator(index_one,index_two,team1,team2,mn,csv,cev,fixed_team_one_players,fixed_team_two_players,captain_team_one_players,captain_team_two_players,vice_captain_team_one_players,vice_captain_team_two_players,selected_tsd,series_index,mode,sport_id,fantasy,{})
                        })
                    })
                })
    
            })
            
    })
    } 
    else
    {
        mode_method(team1,team2,mn,index_one,index_two,series_index,mode,sport_id,fantasy)
    } 
})

}
