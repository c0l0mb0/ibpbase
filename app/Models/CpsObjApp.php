<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CpsObjApp extends Model
{
    use HasFactory;

    protected $fillable = [
         'id_obj', 'id_app', 'quantity', 'Bit_coincidence', 'Cel_January_gray', 'Cel_February_gray', 'Cel_March_gray',
        'Cel_April_gray', 'Cel_May_gray', 'Cel_June_gray', 'Cel_July_gray', 'Cel_August_gray', 'Cel_September_gray',
        'Cel_October_gray', 'Cel_November_gray', 'Cel_December_gray', 'numb_syst_asps', 'numb_syst_aspt', 'app_year',
        'measure', 'Cel_July', 'Cel_November', 'Cel_January', 'Cel_August', 'Cel_February', 'who_change', 'Cel_March',
        'Cel_September', 'Cel_April', 'Cel_December', 'Cel_May', 'Cel_October', 'Cel_June', 'who_create',
    ];
}
