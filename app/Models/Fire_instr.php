<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fire_instr extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_worker', 'date_check_last', 'date_check_next'];
}
