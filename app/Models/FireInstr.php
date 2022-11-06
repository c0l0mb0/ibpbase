<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FireInstr extends Model
{
    use HasFactory;
    protected $table = 'Fire_instr';

    protected $fillable = [
        'id_worker', 'date_check_last', 'date_check_next'];
}
