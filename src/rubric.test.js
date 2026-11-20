import test from 'node:test';import assert from 'node:assert/strict';
import{RUBRIC,ALL_ITEMS,MAX_SCORE,scoreFor,completedCount,calculateTotal,validScore}from'./rubric.js';
test('rubrik sesuai 6 komponen, 27 indikator dan bobot total 100',()=>{assert.equal(RUBRIC.length,6);assert.equal(ALL_ITEMS.length,27);assert.equal(MAX_SCORE,100);assert.deepEqual(RUBRIC.map(r=>r.max),[15,15,30,20,15,5]);for(const s of RUBRIC)assert.equal(s.items.reduce((x,i)=>x+i.max,0),s.max)});
test('skor nol merupakan nilai valid, sementara kosong belum terisi',()=>{assert.equal(validScore(ALL_ITEMS[0],0),true);assert.equal(validScore(ALL_ITEMS[0],6),false);assert.equal(completedCount({'I1':0}),1);assert.equal(completedCount({}),0)});
test('semua indikator skor maksimal menghasilkan 100',()=>{const scores=Object.fromEntries(ALL_ITEMS.map(item=>[item.code,item.max]));assert.equal(completedCount(scores),27);assert.equal(calculateTotal(scores),100)});
test('jumlah komponen dan total akurat',()=>{const scores={I1:3,I2:2,I3:4,M1:5};assert.equal(scoreFor(RUBRIC[0],scores),9);assert.equal(calculateTotal(scores),14)});
