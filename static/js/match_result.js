
let get_match_result_number = function(series_index,sport_id)
{
    mrnc= document.getElementById('match_result_number_continue')
    mrnc.addEventListener('click',()=>
    {
        mrnv = document.getElementById('match_result_number_value').value
        if(mrnv!=null)
        {
            if(localStorage.getItem(`WA_${sport_id}_${series_index}_${mrnv}`)==null){raiseError('Match Number does not exist! kindly generate Match Number'); return}
            console.log('everything is fine')
            fetch_match(Number(mrnv),series_index,sport_id);
        }
        else
        {
            raiseError('Invalid Input!')
            return
        }
    })
}
let fetch_match = function(mn,series_index,sport_id)
{
    let team_list=sd.req_data[series_index].teams_list
    mrn= document.getElementById('match_result_number')
    if(mrn!=null)
    mrn.style.display="none"
    md=document.getElementById('match_detail')
    md.style.display="block"
    match_obj = JSON.parse(localStorage.getItem(`WA_${sport_id}_${series_index}_${mn}`))
    
    toh=document.querySelector('#team_one_vp_head')
    tth= document.querySelector('#team_two_vp_head')
    if(sport_id==0)
    {
    image_one = document.createElement('img')
    image_two = document.createElement('img')
    image_one.src=`dream11_images/${team_list[match_obj.team_one_index]}.jpg`
    image_two.src=`dream11_images/${team_list[match_obj.team_two_index]}.jpg`
    image_one.classList.add('team-image')
    image_two.classList.add('team-image')
    toh.appendChild(image_one)
    tth.appendChild(image_two)
    }
    else{
        team_one_img = document.createElement('div')
        team_two_img = document.createElement('div')
        h6_one = document.createElement('h6')
        h6_two = document.createElement('h6')
        h6_one.style.paddingTop="5px"
        h6_two.style.paddingTop="5px"
        h6_one.textContent=team_list[match_obj.team_one_index]
        h6_two.textContent=team_list[match_obj.team_two_index]
        team_one_img.appendChild(h6_one)
        team_two_img.appendChild(h6_two)
        team_one_img.style.border="1px solid black"
        team_two_img.style.border="1px solid black"
        team_one_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        team_two_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        toh.appendChild(team_one_img)
        tth.appendChild(team_two_img)
    }
    // now main part
    mdc = document.getElementById('match_detail_container')
    if(match_obj.result==false)
    {
        result_div = document.createElement('div')
        result_div.classList.add('border-red','container','text-center','m-2')
        result_text_span = document.createElement('span')
        result_text_span.textContent = "Kindly Update Players Points from Dream 11 App"
        result_btn_span = document.createElement('span')
        result_btn_span.classList.add('btn','btn-info','ml-4')
        result_btn_span.textContent="Update Here"
        result_btn_span.setAttribute('id','result_update')
        result_div.appendChild(result_text_span)
        result_div.appendChild(result_btn_span)
        mdc.appendChild(result_div)
    }
    // now iterating 
    match_obj.attempts.forEach((attempt,index)=>
    {
        outer_div = document.createElement('div')
        outer_div.classList.add('container','d-flex','justify-content-around','align-items-center','border-grey','flex-wrap','m-2')
        h3_one = document.createElement('h6')
        h3_one.textContent=`Match No : ${match_obj.match_no}`
        h3_two = document.createElement('h6')
        h3_two.textContent=`Attempt Id : ${attempt.team_list_id}`
        span_my_id=document.createElement('span')
        span_my_id.textContent=attempt.team_list_id
        span_my_id.setAttribute('id','my_id')
        span_my_id.style.display="none"
        h3_three = document.createElement('h6')
        h3_three.textContent=`Number of teams : ${attempt.team_list_count}`
        span_one = document.createElement('span')
        span_one.textContent='See Results'
        span_one.classList.add('btn','btn-success','m-2')
        span_one.setAttribute('id','check_results')
        span_two = document.createElement('span')
        span_two.textContent='See Teams'
        span_two.appendChild(span_my_id)
        span_two.classList.add('btn','btn-primary','m-2')
        span_two.setAttribute('id','check_teams')
        inner_div = document.createElement('div')
        inner_div.classList.add('d-flex','flex-column','p-2','justify-content-center')
        if(match_obj.result==true)
            inner_div.appendChild(span_one)
        inner_div.appendChild(span_two)
        outer_div.appendChild(h3_one)
        outer_div.appendChild(h3_two)
        outer_div.appendChild(h3_three)
        outer_div.appendChild(inner_div)
        mdc.appendChild(outer_div)
    })
    ct = document.querySelectorAll('#check_teams')
    ct.forEach((obj,index)=>
    {
        obj.addEventListener('click',()=>
        {
            md=document.getElementById('match_detail')
            md.style.display="none"
            bobby = obj.querySelector('#my_id').textContent
            display_teams(mn,index,match_obj.team_one_index,match_obj.team_two_index,series_index,bobby,sport_id)
        })
    })
    cr = document.querySelectorAll('#check_results')
    if(cr!=null)
    {
        cr.forEach((obj,index)=>
        {
            obj.addEventListener('click',()=>
            {
                md=document.getElementById('match_detail')
                md.style.display="none"
                console.log(match_obj.attempts[index])
                calc_first_ten(mn,index,series_index,sport_id)
            })
        })
    }
    result_helper(mn,series_index,sport_id)
}
let calc_first_ten = function(mn,attempt_index,series_index,sport_id)
{
   // console.log(attempt_id)
    let temp = localStorage.getItem(`WA_${sport_id}_${series_index}_${mn}`)
    rv= document.getElementById('results_vp')
    rv.style.display="block"
    vp_footer = document.querySelector('#footer_vp')
    vp_footer.style.visibility='hidden'
    obj = JSON.parse(temp)
    result_teams = get_result_teams(obj,attempt_index,series_index,sport_id)
    
}
let get_result_teams = function(obj,attempt_index,series_index,sport_id)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE']
    ]
    role_value = all_value[sport_id]
    attempt =null
    obj.attempts.forEach((temp_attempt,index)=>
    {
       if(attempt_index==index)
       {
           attempt = temp_attempt
       }
    })
    console.log(attempt)
    result_list =[]
    attempt.team_list.forEach((team,index)=>
    {
        result_vp_array = get_team_score(obj,team,attempt,series_index,sport_id)
        // lot of changes required
        result_list.push(new Item(index,result_vp_array[0],result_vp_array[1]))
    })
    result_list.sort((x,y)=>
    {
        if(x.score<y.score) return 1;
        else return -1
    })
    team_result_placer = document.getElementById('team_result_placer')
    team_result_placer.display="block"
    let upper = 200
    if(attempt.team_list_count<upper)
        upper=attempt.team_list_count
    for(let i=0;i<upper;i++)
    {
        temp_team =attempt.team_list[result_list[i].index]
        vp_team = get_selected_vp_team(temp_team,series_index,sport_id)
        one_arr=[]
        for(let i=0;i<role_value.length;i++)
            one_arr.push([])
        vp_team.forEach((player)=>
        {
            one_arr[player.player_role].push(player)
        })
        team_result_placer.appendChild(final_team_creation(one_arr,attempt.team_list[result_list[i].index].captain,attempt.team_list[result_list[i].index].vice_captain,attempt.team_list[result_list[i].index].team_number,result_list[i].score,1,attempt.team_one_index,attempt.team_two_index,sport_id,result_list[i].individual_score))
    }
}
let get_selected_vp_team = function(team,series_index,sport_id)
{
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[team.team_one_index].players
    team2 = teams_data_obj.teams[team.team_two_index].players
    selected_players=[]
    team.selected_team_one.forEach((sto_index)=>
    {
        selected_players.push(team1[sto_index])
    })
    team.selected_team_two.forEach((stt_index)=>
    {
        selected_players.push(team2[stt_index])
    })
    return selected_players
}
let get_team_score = function(obj,team,attempt,series_index,sport_id)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE']
    ]
    role_value = all_value[sport_id]
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[team.team_one_index].players
    team2 = teams_data_obj.teams[team.team_two_index].players
    selected_players_one =[]
    selected_players_two =[]

    team.selected_team_one.forEach((sto_index)=>
    {
        selected_players_one.push(team1[sto_index])
    })
    team.selected_team_two.forEach((stt_index)=>
    {
        selected_players_two.push(team2[stt_index])
    })
    //------
    one_arr=[]
    for(let i=0;i<role_value.length;i++)
        one_arr.push([])
    //-----
    let sum=0
    selected_players_one.forEach((player,index)=>
    {
        let temp=obj.team_one_result[player.player_index]
        ans=0
        if(player.player_id==team.captain)
            ans=temp*2
        else if(player.player_id==team.vice_captain)
            ans=temp*1.5
        else
            ans=temp
        sum+=ans
        one_arr[player.player_role].push(ans)
    })
    selected_players_two.forEach((player,index)=>
    {
        let temp=obj.team_two_result[player.player_index]
        ans=0
        if(player.player_id==team.captain)
            ans+=temp*2
        else if(player.player_id==team.vice_captain)
            ans+=temp*1.5
        else
            ans+=temp
        sum+=ans
        one_arr[player.player_role].push(ans)
    })
    return [sum,one_arr]
}
let result_helper = function(mn,series_index,sport_id)
{
    match_obj = JSON.parse(localStorage.getItem(`WA_${sport_id}_${series_index}_${mn}`))
    ru = document.getElementById('result_update')
    if(ru==null) return
    ru.addEventListener('click',()=>
    {
        get_player_points(mn,series_index,sport_id)
    })
    // logic for #check_teams
}
let get_player_points = function(mn,series_index,sport_id)
{
    let team_list=sd.req_data[series_index].teams_list
    md = document.getElementById('match_detail')
    md.style.display="none"
    match_obj = JSON.parse(localStorage.getItem(`WA_${sport_id}_${series_index}_${mn}`))
    match_obj.result=true
    pp=document.getElementById('player_points')
    pp.style.display="block"
    toh=document.querySelector('#team_one_kvp_head')
    tth= document.querySelector('#team_two_kvp_head')
    //---------
    if(sport_id==0)
    {
    image_one = document.createElement('img')
    image_two = document.createElement('img')
    image_one.src=`dream11_images/${team_list[match_obj.team_one_index]}.jpg`
    image_two.src=`dream11_images/${team_list[match_obj.team_two_index]}.jpg`
    image_one.classList.add('team-image')
    image_two.classList.add('team-image')
    toh.appendChild(image_one)
    tth.appendChild(image_two)
    }
    else{
        team_one_img = document.createElement('div')
        team_two_img = document.createElement('div')
        h6_one = document.createElement('h6')
        h6_two = document.createElement('h6')
        h6_one.style.paddingTop="5px"
        h6_two.style.paddingTop="5px"
        h6_one.textContent=team_list[match_obj.team_one_index]
        h6_two.textContent=team_list[match_obj.team_two_index]
        team_one_img.appendChild(h6_one)
        team_two_img.appendChild(h6_two)
        team_one_img.style.border="1px solid black"
        team_two_img.style.border="1px solid black"
        team_one_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        team_two_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        toh.appendChild(team_one_img)
        tth.appendChild(team_two_img)
    }
    // comming to the main part
    teams_data = sd.req_data[series_index]
    team_one = teams_data.teams[match_obj.team_one_index]
    team_two = teams_data.teams[match_obj.team_two_index]
    //team one
    vp = document.querySelector('#team_one_points')
    team_one.players.forEach((player)=>
    {
        image = document.createElement('img')
        image.src='player_images/'+player.player_image+'.jpg';
        image.classList.add('selected-player-image')
        span_name = document.createElement('span')
        span_name.textContent=get_name(player.player_name)
        input_num = document.createElement('input')
        input_num.setAttribute('type','number')
        input_num.setAttribute('id','team_one_fantacy_points')
        input_num.classList.add('input-size')
        input_num.value=0
        inner_div = document.createElement('div')
        inner_div.classList.add('d-flex','player-point','justify-content-between','align-items-center')
        inner_div.appendChild(image)
        inner_div.appendChild(span_name)
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','flex-column','justify-content-center','align-items-center','border-grey','m-2')
        outer_div.appendChild(inner_div)
        outer_div.appendChild(input_num)
        vp.appendChild(outer_div)
    })
    // team two
    ttp = document.getElementById('team_two_points')
    team_two.players.forEach((player)=>
    {
        image = document.createElement('img')
        image.src='player_images/'+player.player_image+'.jpg';
        image.classList.add('selected-player-image')
        span_name = document.createElement('span')
        span_name.textContent=get_name(player.player_name)
        input_num = document.createElement('input')
        input_num.setAttribute('type','number')
        input_num.setAttribute('id','team_two_fantacy_points')
        input_num.classList.add('input-size')
        input_num.value=0
        inner_div = document.createElement('div')
        inner_div.classList.add('d-flex','player-point','justify-content-between','align-items-center')
        inner_div.appendChild(image)
        inner_div.appendChild(span_name)
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','flex-column','justify-content-center','align-items-center','border-grey','m-2')
        outer_div.appendChild(inner_div)
        outer_div.appendChild(input_num)
        ttp.appendChild(outer_div)
    })
    //update points continue
    upc = document.getElementById('update_points_continue')
    upc.addEventListener('click',()=>
    {
        tofp = document.querySelectorAll('#team_one_fantacy_points')
        team_one_f_p = []
        tofp.forEach((obj,index)=>
        {
            team_one_f_p.push(Number(obj.value))
        })
        ttfp = document.querySelectorAll('#team_two_fantacy_points')
        team_two_f_p = []
        ttfp.forEach((obj,index)=>
        {
            team_two_f_p.push(Number(obj.value))
        })
        match_obj.team_one_result = team_one_f_p
        match_obj.team_two_result = team_two_f_p
        localStorage.setItem(`WA_${sport_id}_${series_index}_${mn}`,JSON.stringify(match_obj))
        pp_temp = document.getElementById('player_points')
        pp_temp.style.display='none'
        location.reload()
    })
}