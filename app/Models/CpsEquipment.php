<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CpsEquipment extends Model
{
    use HasFactory;



    protected $fillable = [
         'Vadims_sort_numb', 'consist_proc', 'plant', 'Component', 'primary_sens', 'engin_ia', 'engin_id',
        'engin_ua', 'engin_ud', 'engin_iuc', 'inner_equip', 'outer_equip', 'has_channels', 'TO2_new', 'app_name',
        'kind_app', 'app_TO2_numb', 'programs', 'kind_signal', 'kind_app_second', 'brand_name', 'Vadims_sort',
        'app_name_extracted_type', 'app_name_extracted_brand', 'who_change', 'who_create', 'who_delete',
    ];


}
