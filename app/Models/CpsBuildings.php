<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CpsBuildings extends Model
{
    use HasFactory;


    protected $fillable = [
        'id_equip_master_type_locat', 'Plan_graf', 'on_conserv', 'id_equip_master_type', 'GrNumb', 'Queue',
        'affiliate', 'Plan_graf_book', 'Plan_graf_WorkSheet', 'WorkSheet_group_1', 'WorkSheet_group_2', 'Fitt_tmp',
        'Proj_tmp', 'Fitt_year_tmp', 'Proj_year_tmp', 'equip_master_type', 'equip_master_type_locat', 'type_aups',
        'who_change', 'who_create', 'who_delete', 'to_date', 'to_obj_name', 'to_sec_obj_name', 'AudWarnType', 'categ_asu',
        'pasp_numb_syst', 'equip_year_avr', 'area', 'group_1', 'group_2', 'group_3', 'shed',
    ];

}
