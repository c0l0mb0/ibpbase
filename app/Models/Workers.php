<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workers extends Model

{
    use HasFactory;

    protected $fillable = ['id_user', 'fio', 'tab_nom', 'worker_position'];


}
