// analysis triggers
analytic = document.querySelector('#analytic')
analytic.addEventListener('click',()=>
{
    mn = Number(document.querySelector('#span_mn').textContent)
    attempt_id = Number(document.querySelector('#span_attempt_id').textContent)
    series_index = Number(document.querySelector('#span_series_index').textContent)
    sport_id = Number(document.querySelector('#span_sport_id').textContent)
    display_analytics(mn,attempt_id,series_index,sport_id)
})
let display_analytics = function(mn,attempt_id,series_index,sport_id)
{
    console.log(mn,attempt_id,series_index)
    let data = JSON.parse(localStorage.getItem(`WA_${sport_id}_${series_index}_${sd.req_data[series_index].code}_${mn}`))
    data.attempts.forEach((attempt)=>
    {
        if(attempt.team_list_id==attempt_id)
        {
            display_analytics_helper(attempt,series_index,sport_id);
        }
    })
}
let display_analytics_helper = function(attempt,series_index,sport_id)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
    role_value = all_value[sport_id]
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[attempt.team_one_index].players
    team2 = teams_data_obj.teams[attempt.team_two_index].players
    p_names=[]
    selected_player_id=attempt.selected_id
    selected_player_id.forEach((id)=>
    {
        team1.forEach((p)=>{
            if(p.player_id==id)
                p_names.push(get_name(p.player_name))
        })
        team2.forEach((p)=>{
            if(p.player_id==id)
                p_names.push(get_name(p.player_name))
        })
    })
    total_teams=attempt.team_list_count
    ah=document.querySelector('#analytic_head')
    ah.style.display="block"
    teams_shortcut = document.querySelector('#analytic_body')
    teams_shortcut.style.display="block"
    tv = document.querySelector('#teams_vp')
    tv.style.display="none"
    first_arr=[]
    second_arr=[]
    third_arr=[]
    for(let i=0;i<selected_player_id.length;i++)
    {
        first_arr.push(0)
        second_arr.push(0)
        third_arr.push(0)
    }
    fourth_name=[]
    fourth_arr=[]
    attempt.team_list.forEach((team,index)=>
    {
        selected_players =[]
        team.selected_team_one.forEach((sto_index)=>
        {
            selected_players.push(team1[sto_index])
        })
        team.selected_team_two.forEach((stt_index)=>
        {
            selected_players.push(team2[stt_index])
        })

        one_arr_cnt=[]
        for(let i=0;i<role_value.length;i++)
            one_arr_cnt.push(0)
        selected_players.forEach((p)=>
        {
            let req_vp=selected_player_id.indexOf(p.player_id)
            first_arr[req_vp]++;
            one_arr_cnt[p.player_role]+=1
        })
        second_arr[selected_player_id.indexOf(team.captain)]++
        third_arr[selected_player_id.indexOf(team.vice_captain)]++
        line=`${one_arr_cnt[1]}`
        for(let i=2;i<role_value.length;i++)
            line=line+`-${one_arr_cnt[i]}`
        strat =line
        bobby=fourth_name.indexOf(strat)
        if(bobby==-1)
        {
            fourth_name.push(strat)
            fourth_arr.push(1)
        }
        else{
            fourth_arr[bobby]++
        }
    })
    // first
    placer = document.querySelector('#table_placer')
    first_table = get_table('Name',p_names,first_arr,total_teams,'req_data','block','selected player data')
    placer.appendChild(first_table)
    //second
    second_table = get_table('Name',p_names,second_arr,total_teams,'req_data','none','captain selection data')
    placer.appendChild(second_table)
    //thrid
    third_table = get_table('Name',p_names,third_arr,total_teams,'req_data','none','vice-captain selection data')
    placer.appendChild(third_table)
    //fourth
    fourth_table = get_table('Name',fourth_name,fourth_arr,total_teams,'req_data','none','strategy selection data')
    placer.appendChild(fourth_table)
    t_data = document.querySelectorAll('#table_data')
    r_data = document.querySelectorAll('#req_data')
    t_data.forEach((t_trigger,index)=>
    {
        t_trigger.addEventListener('click',()=>
        {
            t_data.forEach((t)=>{t.classList.remove('border-grey')})
            r_data.forEach((r)=>{r.style.display="none"})
            t_trigger.classList.add('border-grey')
            if(index==0)
            {
                r_data[index].style.display="block"
            }
            else if(index==1)
            {
                r_data[index].style.display="block"
            }
            else if(index==2)
            {
                r_data[index].style.display="block"
            }
            else
            {
                r_data[index].style.display="block"
            }
        })
    })
}
let get_table = function(field_name,field_one,field_two,total_teams,table_id,stat,msg)
{
    d = document.createElement('div')
    t_div= document.createElement('div')
    t_div.classList.add('text-center')
    h6=document.createElement('h5')
    h6.textContent=msg
    t_div.appendChild(h6)
    d.appendChild(t_div)
    d.setAttribute('id',table_id)
    t=document.createElement('table')
    t.classList.add('table','border-grey')
    //t.setAttribute('id',table_id)
    th=document.createElement('thead')
    th_tr=document.createElement('tr')
    th_tr_th_1=document.createElement('th')
    th_tr_th_1.setAttribute('scope','col')
    th_tr_th_1.textContent="#"
    th_tr_th_2=document.createElement('th')
    th_tr_th_2.setAttribute('scope','col')
    th_tr_th_2.textContent=field_name
    th_tr_th_3=document.createElement('th')
    th_tr_th_3.setAttribute('scope','col')
    th_tr_th_3.textContent="selected"
    th_tr_th_4=document.createElement('th')
    th_tr_th_4.setAttribute('scope','col')
    th_tr_th_4.textContent="%data"
    th_tr.appendChild(th_tr_th_1)
    th_tr.appendChild(th_tr_th_2)
    th_tr.appendChild(th_tr_th_3)
    th_tr.appendChild(th_tr_th_4)
    th.classList.add('thead-dark')
    th.appendChild(th_tr)
    tb=document.createElement('tbody')
    for(let i=1;i<=field_one.length;i++)
    {
        tb_tr=document.createElement('tr')
        tb_tr_td_1=document.createElement('td')
        tb_tr_td_1.setAttribute('scope','row')
        tb_tr_td_1.textContent=i
        tb_tr_td_2=document.createElement('td')
        tb_tr_td_2.textContent=field_one[i-1]
        tb_tr_td_3=document.createElement('td')
        tb_tr_td_3.textContent=field_two[i-1]
        tb_tr_td_4=document.createElement('td')
        tb_tr_td_4.textContent=`${((field_two[i-1]*100)/total_teams).toPrecision(3)} %`
        tb_tr.appendChild(tb_tr_td_1)
        tb_tr.appendChild(tb_tr_td_2)
        tb_tr.appendChild(tb_tr_td_3)
        tb_tr.appendChild(tb_tr_td_4)
        tb.appendChild(tb_tr)
    }
    t.appendChild(th)
    t.appendChild(tb)
    d.appendChild(t)
    d.style.display=stat
    return d;
}
