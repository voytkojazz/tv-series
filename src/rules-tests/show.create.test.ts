import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import {describe, expect, test, beforeAll, beforeEach, afterAll} from '@jest/globals';
import { doc, getDoc, setDoc, serverTimestamp, setLogLevel, addDoc, collection } from 'firebase/firestore';
import { createWriteStream, readFileSync } from "fs"
import { getFirestoreCoverageMeta } from "./utils";
import { resolve } from "path";
import { get } from "node:http";

let testEnv: RulesTestEnvironment

const PROJECT_ID = 'tv-series-ce-711'
const FIREBASE_JSON = resolve(__dirname, '../../firebase.json');


beforeAll(async () => {
    const { host, port } = getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON)
    testEnv = await initializeTestEnvironment({
        projectId: "tv-series-ce711",
        firestore: {
            host: host,
            port: port,
            rules: readFileSync('../../firestore.rules', 'utf-8')
        }
    })


})


afterAll(async () => {
    // Write the coverage report to a file
    const { coverageUrl } = await getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON);
    const coverageFile = './firestore-coverage.html';
    const fstream = createWriteStream(coverageFile);
    await new Promise((resolve, reject) => {
        get(coverageUrl, (res) => {
            res.pipe(fstream, { end: true });
            res.on("end", resolve);
            res.on("error", reject);
        });
    });
    console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});


beforeEach(async () => {
    await testEnv.clearFirestore();
});


describe("Table shows", () => {

    test("should let read the shows table", async () => {
        const unauthDb = testEnv.unauthenticatedContext().firestore()
        await assertSucceeds(getDoc(doc(unauthDb, "table-show/foobar")))
    })

    test('should not allow to create without mazeID', async () => {
        const unauthDb = testEnv.unauthenticatedContext().firestore()
        await assertFails(addDoc(collection(unauthDb, 'table-show'), {
            id: 1, 
            title: "some title"
        }))
    })

})