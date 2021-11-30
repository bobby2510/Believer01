let change_player_data = function(team_index,series_index)
{
    teams_data = sd.req_data[series_index]
    team = teams_data.teams[team_index]
    console.log(team)
    cpp = document.getElementById('change_player_placer')
    role_value = ['','WK','BAT','AL','BOWL']
    player_r = document.querySelector('#my_player_r')
    for(let i=1;i<role_value.length;i++)
        {
            c_o = document.createElement('option')
            c_o.value=i
            c_o.textContent=role_value[i]
            player_r.appendChild(c_o)
        }
    ap = document.querySelector('#my_add_player')
    ap.addEventListener('click',()=>
    {
        apd = document.querySelector('#my_add_player_data')
        apd.style.display="block"
    })
    main_add = document.querySelector('#my_main_add')
    main_add.addEventListener('click',()=>
    {
        player_n = document.querySelector('#my_player_n')
        player_c = document.querySelector('#my_player_c')
        player_r = document.querySelector('#my_player_r')

        if(player_n.value== null || player_n.value.length< 3)
        {
            raiseError('Invalid Player name!')
            return
        }
        if(player_c.value == null || player_c.value=='' ||  parseFloat(player_c.value)<0)
        {
            raiseError('Invalid player credits!')
            return
        }
        
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','justify-content-around','flex-wrap','container','border-grey','m-2','align-items-center')
        img = document.createElement('img')
        img.src='player_images/'+'0'+'.jpg';
        img.classList.add('selected-player-image')
        h4 = document.createElement('h6')
        h4.setAttribute('id','p_name')
        h4.textContent = player_n.value
        inner_div_one = document.createElement('div')
        span_role = document.createElement('small')
        span_role.textContent="Role :"
        select_role = document.createElement('SELECT')
        option_1 = document.createElement('option')
        option_1.setAttribute('value','1')
        option_1.textContent="WK"
        option_2 = document.createElement('option')
        option_2.setAttribute('value','2')
        option_2.textContent="BAT"
        option_3 = document.createElement('option')
        option_3.setAttribute('value','3')
        option_3.textContent="AL"
        option_4 = document.createElement('option')
        option_4.setAttribute('value','4')
        option_4.textContent="BOWL"
        if(player_r.value==1)
        {
            option_1.setAttribute('selected','selected')
        }
        else if(player_r.value==2)
        {
            option_2.setAttribute('selected','selected')
        }
        else if(player_r.value==3)
        {
            option_3.setAttribute('selected','selected')
        }
        else
        {
            option_4.setAttribute('selected','selected')
        }
        select_role.appendChild(option_1)
        select_role.appendChild(option_2)
        select_role.appendChild(option_3)
        select_role.appendChild(option_4)
        select_role.setAttribute('id','pr')
        inner_div_one.appendChild(span_role)
        inner_div_one.appendChild(select_role)
        inner_div_two = document.createElement('div')
        span_credits = document.createElement('small')
        span_credits.textContent="Credits :"
        input_credits = document.createElement('input')
        input_credits.setAttribute('type','number')
        input_credits.classList.add('input-change-size')
        input_credits.value = player_c.value
        input_credits.setAttribute('id','pc')
        inner_div_two.appendChild(span_credits)
        inner_div_two.appendChild(input_credits)
        inner_div_one.classList.add('final_kvp')
        inner_div_two.classList.add('final_kvp')
        outer_div.appendChild(img)
        outer_div.appendChild(h4)
        outer_sub_div = document.createElement('div')
        outer_sub_div.classList.add('d-flex','flex-wrap','justify-content-around','align-items-center','m-2','p-2')
        outer_sub_div.appendChild(inner_div_one)
        outer_sub_div.appendChild(inner_div_two)
        outer_div.appendChild(outer_sub_div)
        cpp.insertBefore(outer_div,cpp.firstChild)
        player_n.value=''
        player_c.value=''
        apd = document.querySelector('#my_add_player_data')
        apd.style.display="none"
        })
    team.players.forEach((player,index)=>
    {
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','justify-content-around','flex-wrap','container','border-grey','m-2','align-items-center')
        img = document.createElement('img')
        var image_flag = sd.req_data[series_index].image_present
        if(image_flag !=undefined && image_flag == 1)
        img.src = player.player_image;
        else 
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        h4 = document.createElement('h6')
        h4.textContent = player.player_name
        inner_div_one = document.createElement('div')
        span_role = document.createElement('small')
        span_role.textContent="Role :"
        select_role = document.createElement('SELECT')
        option_1 = document.createElement('option')
        option_1.setAttribute('value','1')
        option_1.textContent="WK"
        option_2 = document.createElement('option')
        option_2.setAttribute('value','2')
        option_2.textContent="BAT"
        option_3 = document.createElement('option')
        option_3.setAttribute('value','3')
        option_3.textContent="AL"
        option_4 = document.createElement('option')
        option_4.setAttribute('value','4')
        option_4.textContent="BOWL"
        if(player.player_role==1)
        {
            option_1.setAttribute('selected','selected')
        }
        else if(player.player_role==2)
        {
            option_2.setAttribute('selected','selected')
        }
        else if(player.player_role==3)
        {
            option_3.setAttribute('selected','selected')
        }
        else
        {
            option_4.setAttribute('selected','selected')
        }
        select_role.appendChild(option_1)
        select_role.appendChild(option_2)
        select_role.appendChild(option_3)
        select_role.appendChild(option_4)
        select_role.setAttribute('id','pr')
        inner_div_one.appendChild(span_role)
        inner_div_one.appendChild(select_role)
        inner_div_two = document.createElement('div')
        span_credits = document.createElement('small')
        span_credits.textContent="Credits :"
        input_credits = document.createElement('input')
        input_credits.setAttribute('type','number')
        input_credits.classList.add('input-change-size')
        input_credits.value = player.player_credits
        input_credits.setAttribute('id','pc')
        inner_div_two.appendChild(span_credits)
        inner_div_two.appendChild(input_credits)
        inner_div_one.classList.add('final_kvp')
        inner_div_two.classList.add('final_kvp')
        outer_div.appendChild(img)
        outer_div.appendChild(h4)
        outer_sub_div = document.createElement('div')
        outer_sub_div.classList.add('d-flex','flex-wrap','justify-content-around','align-items-center','m-2','p-2')
        outer_sub_div.appendChild(inner_div_one)
        outer_sub_div.appendChild(inner_div_two)
        outer_div.appendChild(outer_sub_div)
        cpp.appendChild(outer_div)
    })
    // just continue
    cpu = document.getElementById('change_player_update')
    cpu.addEventListener('click',()=>
    {
        pr_list = document.querySelectorAll('#pr')
        pc_list = document.querySelectorAll('#pc')
        p_name_list = document.querySelectorAll('#p_name')
        pr_data=[]
        pc_data=[]
        p_name_data = []
        pr_list.forEach((ele)=>
        {
            pr_data.push(Number(ele.value))
        })
        pc_list.forEach((ele)=>
        {
            pc_data.push(Number(ele.value))
        })
        p_name_list.forEach((ele)=>
        {
            p_name_data.push(ele.textContent)
        })
// lot of code have to be dumbped here 
    temp1 = pr_data.length - teams_data.teams[team_index].players.length
   // console.log(temp1)
    start_id = teams_data.teams[team_index].players[0].player_id - temp1-1
    new_arr = []
    for(let i =0;i<temp1;i++)
    {
        new_arr.push(new Player(p_name_data[i],pr_data[i],pc_data[i],0,i,team_index,start_id))
        start_id = start_id + 1
    }
    old_arr = teams_data.teams[team_index].players 
    for(let i=new_arr.length-1;i>=0;i--)
        old_arr.unshift(new_arr[i])
    
    teams_data.teams[team_index].players = old_arr
    teams_data.teams[team_index].players.forEach((player,index)=>
    {
        player.player_role=pr_data[index]
        player.player_credits=pc_data[index]
        player.player_index = index
    })
    sd.req_data[series_index]=teams_data
    localStorage.setItem('series_data',JSON.stringify(sd))
    SuccessMsg('Player data updated Successfully!')
    location.reload()
    })
}
