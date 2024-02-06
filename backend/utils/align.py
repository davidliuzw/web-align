from Bio.Blast import NCBIWWW
from Bio.Blast import NCBIXML
from Bio import SeqIO
from Bio import Align
import os
import logging
logger = logging.getLogger(__name__)

def blast_align(request_seq):
    # Assume you have the DNA sequence in a variable called 'dna_sequence'
    dna_sequence = request_seq
    logging.info("Alignment in progress")
    # Perform BLAST search
    fasta_string = f">query\n{dna_sequence}\n"

    logger.info("sequence processed: "+fasta_string)

    result_handle = NCBIWWW.qblast("blastn", "nt", fasta_string)

    # local blast
    # blast_cmd = NcbiblastnCommandline(query="-", db="nt", evalue=0.001, outfmt=5)
    # result, error = blast_cmd(stdin=fasta_string, stdout=True, stderr=True)
    # # # Parse the result as XML
    # result_handle = StringIO(result)

    blast_record = NCBIXML.read(result_handle)

    # Pass relevant data to the template
    alignments = []
    for alignment in blast_record.alignments:
        alignment_data = {
            "accession": alignment.accession,
            "length": alignment.length,
            "e_value": alignment.hsps[0].expect,
            "hsps": []
        }
        for hsp in alignment.hsps:
            hsp_data = {
                "query_start": hsp.query_start,
                "query_end": hsp.query_end,
                "subject_start": hsp.sbjct_start,
                "subject_end": hsp.sbjct_end,
                "align_length": hsp.align_length,
                "identity": hsp.identities,
                "gaps": hsp.gaps,
            }
            alignment_data["hsps"].append(hsp_data)
        alignments.append(alignment_data)
    
    return alignments

def align_sequence_to_lib(sequence):
    aligner = Align.PairwiseAligner()
    logging.info("Alignment in progress...")
    results = []
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fasta_file = os.path.join(script_dir, "merged.fasta")
    with open(fasta_file, 'r') as fasta:
        for record in SeqIO.parse(fasta, "fasta"):
            record_sequence = str(record.seq)
            alignment = aligner.align(sequence, record_sequence)
            if alignment:
                logging.info("Alignment hit!")
                results = [record.description]
                return results
    return None

# # Example usage
# sequence = "ATCGATCGATCG"
# fasta_file = "lib/merged.fasta"
# header, record_sequence, alignment = align_sequence_to_lib(sequence, fasta_file)
# if alignment:
#     print("Header:", header)
#     print("Sequence:", record_sequence)
#     print("Alignment:", alignment)
# else:
#     print("No alignment found.")
    